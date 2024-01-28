#include "secrets.h"
#include <Arduino.h>
#include <DHT.h>
#include <DHT_U.h>
#include <ArduinoJson.h>
#include <PubSubClient.h>
#include "WIFI.h"
#include <MQTTClient.h>
#include <WiFiClientSecure.h>
#include <TinyGPS++.h>
#include <HTTPClient.h>


WiFiClientSecure net = WiFiClientSecure();
MQTTClient client = MQTTClient(256);
TinyGPSPlus gps;


#define AWS_IOT_SUBSCRIBE_TOPIC "3yp/Area001/Bin_001"
#define AWS_IOT_PUBLISH_TOPIC "3yp/Area001/Bin_001"


//define DHT11 pin
DHT dht(26, DHT11);
#define ledPin 5

// ultrasonic sensors
#define echoPin1 23
#define trigPin1 22
#define echoPin2 27
#define trigPin2 25
bool isConnected = false;
#define led1Pin 16
#define led2Pin 17
#define led3Pin 18
#define led4Pin 19

// Define variables for temperature and humidity
float duration1, distance1, duration2, distance2, temperature;
float gpsLatitude = 7.253988930424021;
float gpsLongitude =  80.59166442208883;
String binid = "Bin_001";

unsigned long lastPublishTime = 0;
const unsigned long publishInterval = 5000; // Publish data every 5 seconds


// Define relay and door lock pins
#define relayPin 13



void setup() {
  Serial.begin(115200);
  Serial2.begin(9600, SERIAL_8N1, 14, 15); // rx, tx  
  connectToWifi();
  connectTOAws();
  
  dht.begin();
  // ultrasonic sensors
  pinMode(trigPin1, OUTPUT);
  pinMode(echoPin1, INPUT);
  pinMode(trigPin2, OUTPUT);
  pinMode(echoPin2, INPUT);
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(ledPin, OUTPUT); 
  pinMode(led1Pin, OUTPUT);
  pinMode(led2Pin, OUTPUT);
  pinMode(led3Pin, OUTPUT);
  pinMode(led4Pin, OUTPUT);

  // Define relay and door lock pins
  pinMode(relayPin, OUTPUT);
}

void connectTOAws() 
{
  net.setCACert(AWS_CERT_CA);
  net.setCertificate(AWS_CERT_CRT);
  net.setPrivateKey(AWS_CERT_PRIVATE);

  client.begin(AWS_IOT_ENDPOINT, 8883, net);

  Serial.println("Connecting to AWS IOT");

  while (!client.connect(THINGNAME)) {
    Serial.print(".");
    delay(500);
  }

  if(!client.connected()){
    Serial.println("AWS IoT Timeout!");
    return;
  }

  client.subscribe(AWS_IOT_SUBSCRIBE_TOPIC);
  Serial.println("AWS IoT Connected!");
}

void loop() {

  //GPS
  readGPSData();
  //dh11
  temperature = dht.readTemperature();
  //humidity and temperature
  if (isnan(temperature) )  // Check if any reads failed and exit early (to try again).
  {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }
  // Display the temperature in Serial Monitor
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println(" *C");
  // Turn on the LED if the temperature is more than 25
  if (temperature > 25) {
    digitalWrite(ledPin, HIGH); // Turn on the LED
    delay(500); // Wait for 500 milliseconds
    digitalWrite(ledPin, LOW); // Turn off the LED
    delay(500); // Wait for 500 milliseconds
  } else {
    digitalWrite(ledPin, LOW); // Turn off the LED
  }

  // Triggering the ultrasonic sensors
  digitalWrite(trigPin1, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin1, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin1, LOW);
  duration1 = pulseIn(echoPin1, HIGH);
  distance1 = duration1 / 58.2;

  digitalWrite(trigPin2, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin2, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin2, LOW);
  duration2 = pulseIn(echoPin2, HIGH);
  distance2 = duration2 / 58.2;

  //Averaging the distance readings
  float averageDistance = (distance1 + distance2) / 2;

  // Displaying the distance
  Serial.print("Distance 1: ");
  Serial.print(distance1);
  Serial.println(" cm");
  Serial.print("Distance 2: ");
  Serial.print(distance2);
  Serial.println(" cm");
  Serial.print("Average Distance: ");
  Serial.print(averageDistance);
  Serial.println(" cm");

  Serial.println("latitude: ");
  Serial.println(gpsLatitude,6);
  Serial.println("longitude: ");
  Serial.println(gpsLongitude,6);
  // Update garbage level LEDs based on distance
  if (averageDistance <= 10 ){
    digitalWrite(led1Pin, HIGH);
    digitalWrite(led2Pin, LOW);
    digitalWrite(led3Pin, LOW);
    digitalWrite(led4Pin, LOW);
    digitalWrite(relayPin,LOW);
  } else if (averageDistance <= 20) {
    digitalWrite(led1Pin, LOW);
    digitalWrite(led2Pin, HIGH);
    digitalWrite(led3Pin, LOW);
    digitalWrite(led4Pin, LOW);
    digitalWrite(relayPin, HIGH);
  } else if (averageDistance <= 35) {
    digitalWrite(led1Pin, LOW);
    digitalWrite(led2Pin, LOW);
    digitalWrite(led3Pin, HIGH);
    digitalWrite(led4Pin, LOW);
    digitalWrite(relayPin, HIGH);
  } else {
    digitalWrite(led1Pin, LOW);
    digitalWrite(led2Pin, LOW);
    digitalWrite(led3Pin, LOW);
    digitalWrite(led4Pin, HIGH);
    digitalWrite(relayPin, HIGH);
  }

  sendStatsTOAWS();
  client.loop();
  delay(500);
}

void readGPSData()
{
  while (Serial2.available() > 0)
  {
    if (gps.encode(Serial2.read()))
    {
      if (gps.location.isValid())
      {
        gpsLatitude = gps.location.lat();
        gpsLongitude = gps.location.lng();
        Serial2.print("Latitude: ");
        Serial2.print(gpsLatitude, 6);
        Serial2.print(" | Longitude: ");
        Serial2.println(gpsLongitude, 6);
      }
    }
  }
}

void sendStatsTOAWS()
{
  StaticJsonDocument<128> doc;
  doc["binId"] = binid;
  doc["filledLevel"] = (distance1 + distance2) / 2;
  doc["temperature"] = temperature;
  doc["latitude"] = gpsLatitude;
  doc["longitude"] = gpsLongitude;

  char jsonBuffer[256];
  serializeJson(doc, jsonBuffer);
  if (client.connected()) { // Check if client is connected
      client.publish(AWS_IOT_PUBLISH_TOPIC, jsonBuffer);
  }
}

void connectToWifi() 
{
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.println("Connecting to WiFi..");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected to the WiFi network");
}

