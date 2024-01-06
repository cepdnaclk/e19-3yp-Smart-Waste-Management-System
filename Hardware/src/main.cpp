#include <Arduino.h>
#include <WiFi.h>
#include <DHT.h>
#include <DHT_U.h>
#include <Adafruit_Sensor.h> 

//define DHT11 pin
DHT dht(26, DHT11);

// Replace with your network credentials
const char *ssid = "Nandun's S23";
const char *password = "thefox1234";

// Set web server port number to 80
#define echoPin 2  
#define trigPin 4  
#define ledPin 13 // LED connected to pin 13

// Variables for the duration and the distance
long duration, distance;
bool isConnected = false;

// Define garbage level LEDs
#define led1Pin 16
#define led2Pin 17
#define led3Pin 18
#define led4Pin 19

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);

  //ultrasonic sensors
  pinMode(LED_BUILTIN, OUTPUT);
  // Set the LED pin as an output
  pinMode(ledPin, OUTPUT); 

  // Set garbage level LEDs as outputs
  pinMode(led1Pin, OUTPUT);
  pinMode(led2Pin, OUTPUT);
  pinMode(led3Pin, OUTPUT);
  pinMode(led4Pin, OUTPUT);

  WiFi.begin(ssid, password);
  Serial.println("starting");

  //dh11
  dht.begin();
  Serial.println("DHT11 sensor started");
  delay(1000);

  // Wait for connection
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

}


void loop() {
  
  //wifi
  if (WiFi.status() == WL_CONNECTED && !isConnected) {
    Serial.println("Connected");
    digitalWrite(LED_BUILTIN, HIGH);
    isConnected = true;
  }

  if (WiFi.status() != WL_CONNECTED) {
    Serial.println(".");
    digitalWrite(LED_BUILTIN, !digitalRead(LED_BUILTIN));
    delay(1000);
    isConnected = false;
  }


  //dh11
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  // Triggering the ultrasonic sensor
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Reading the duration of the pulse from the echo pin
  duration = pulseIn(echoPin, HIGH);

  // Calculating the distance in centimeters
  distance = duration / 58.2;

  // Displaying the distance
  Serial.print("Garbage Level: ");
  Serial.print(distance);
  Serial.println(" cm");

  // Update garbage level LEDs based on distance
  if (distance <= 10) {
    digitalWrite(led1Pin, HIGH);
    digitalWrite(led2Pin, LOW);
    digitalWrite(led3Pin, LOW);
    digitalWrite(led4Pin, LOW);
  } else if (distance <= 15) {
    digitalWrite(led1Pin, LOW);
    digitalWrite(led2Pin, HIGH);
    digitalWrite(led3Pin, LOW);
    digitalWrite(led4Pin, LOW);
  } else if (distance <= 20) {
    digitalWrite(led1Pin, LOW);
    digitalWrite(led2Pin, LOW);
    digitalWrite(led3Pin, HIGH);
    digitalWrite(led4Pin, LOW);
  } else {
    digitalWrite(led1Pin, LOW);
    digitalWrite(led2Pin, LOW);
    digitalWrite(led3Pin, LOW);
    digitalWrite(led4Pin, HIGH);
  }

  //humidity and temperature
  Serial.print("Temperature in bin: ");
  Serial.print(temperature);
  Serial.println(" *C");

  // Turn on the LED if the temperature is more than 25
  if (temperature > 25) {
    digitalWrite(ledPin, HIGH); // Turn on the LED
  } else {
    digitalWrite(ledPin, LOW); // Turn off the LED
  }

  // Make a sound if the distance is less than 10 cm
  delay(1000);
}