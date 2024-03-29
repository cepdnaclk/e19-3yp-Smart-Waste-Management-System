const mqtt = require("mqtt");
const fs = require("fs");

// AWS IoT configuration
const awsIotEndpoint = process.env.AWS_MQTT_END_POINT;
const awsIotTopic = "3yp/Area001/Bin_001";
const clientId = "mqqt-client";

const mqttClient = mqtt.connect(awsIotEndpoint, {
  clientId: clientId,
  clean: true,
  // Add your AWS IoT certificate options here
  key: fs.readFileSync("./controllers/cert/private.pem.key"),
  cert: fs.readFileSync("./controllers/cert/client-certificate.pem.crt"),
  ca: fs.readFileSync("./controllers/cert/AmazonRootCA1.pem"),
});

let latestMqttData = null;

mqttClient.on("connect", () => {
  console.log("Connected to MQTT broker");
  mqttClient.subscribe(awsIotTopic, (err) => {
    if (!err) {
      console.log(`Subscribed to topic: ${awsIotTopic}`);
    }
  });
});

mqttClient.on("message", (topic, message) => {
  const payload = message.toString();
  console.log(`Received message on topic '${topic}': ${payload}`);
  // Update latestMqttData
  try {
    latestMqttData = JSON.parse(payload);
    // console.log("mqqt data", latestMqttData);
  } catch (error) {
    console.error("Error parsing MQTT payload as JSON:", error);
    return;
  }
});

// Function to get the latest MQTT data
const getLatestMqttData = () => {
  return latestMqttData;
};

module.exports = {
  getLatestMqttData,
};
