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


WiFiClientSecure net = WiFiClientSecure();
MQTTClient client = MQTTClient(256);
TinyGPSPlus gps;

#define AWS_IOT_SUBSCRIBE_TOPIC "thing/3YP-ESP/sub"
#define AWS_IOT_PUBLISH_TOPIC "thing/3YP-ESP/pub"

//define DHT11 pin
DHT dht(26, DHT11);
#define ledPin 13 

// ultrasonic sensors
#define echoPin 23
#define trigPin 22
bool isConnected = false;
#define led1Pin 16
#define led2Pin 17
#define led3Pin 18
#define led4Pin 19

// Define variables for temperature and humidity
float duration, distance , temperature;
float gpsLatitude = 7.253988930424021;
float gpsLongitude =  80.59166442208883;

// Define relay and door lock pins
#define relayPin 5


void setup() {
  Serial.begin(921600);
  Serial2.begin(9600, SERIAL_8N1, 16, 17);//rx,tx
  connectToWifi();
  connectTOAws();

  dht.begin();
  delay(1000);

  // ultrasonic sensors
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  delay(500);
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

  //dh11
  temperature = dht.readTemperature();
  //humidity and temperature
  if (isnan(temperature) )  // Check if any reads failed and exit early (to try again).
  {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }
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

  // Triggering the ultrasonic sensor
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = duration / 58.2;
  // Displaying the distance
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");
  Serial.println("latitude: ");
  Serial.println(gpsLatitude,6);
  Serial.println("longitude: ");
  Serial.println(gpsLongitude,6);
  // Update garbage level LEDs based on distance
  if (distance <= 5 ){
    digitalWrite(led1Pin, HIGH);
    digitalWrite(led2Pin, LOW);
    digitalWrite(led3Pin, LOW);
    digitalWrite(led4Pin, LOW);
    digitalWrite(relayPin, LOW);
  } else if (distance <= 10) {
    digitalWrite(led1Pin, LOW);
    digitalWrite(led2Pin, HIGH);
    digitalWrite(led3Pin, LOW);
    digitalWrite(led4Pin, LOW);
    digitalWrite(relayPin, HIGH);
  } else if (distance <= 15) {
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
  sendRelayStatusToAWS(); // Publish relay pin status to AWS IoT Core
  client.loop();
  delay(1000);
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
  StaticJsonDocument<200> doc;
  doc["temperature"] = temperature;
  doc["distance"] = distance;
  doc["latitude"] = gpsLatitude;
  doc["longitude"] = gpsLongitude;

  char jsonBuffer[512];
  serializeJson(doc, jsonBuffer);
  client.publish(AWS_IOT_PUBLISH_TOPIC, jsonBuffer);
}

void sendRelayStatusToAWS()
{
  StaticJsonDocument<100> doc;
  doc["relayStatus"] = digitalRead(relayPin);

  char jsonBuffer[128];
  serializeJson(doc, jsonBuffer);
  client.publish(AWS_IOT_PUBLISH_TOPIC, jsonBuffer);
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
