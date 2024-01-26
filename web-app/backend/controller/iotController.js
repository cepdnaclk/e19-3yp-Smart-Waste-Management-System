// iotController.js
const mqtt = require("mqtt");
const fs = require("fs");

// AWS IoT configuration
const awsIotEndpoint = process.env.AWS_MQTT_END_POINT;
const awsIotTopic = "3yp/Area001/Bin_001";
const clientId = "mqqt-client";

// Socket.IO setup
let io;

const mqttClient = mqtt.connect(awsIotEndpoint, {
  clientId: clientId,
  clean: true,
  // Add your AWS IoT certificate options here
  key: fs.readFileSync("./controller/cert/private.pem.key"),
  cert: fs.readFileSync("./controller/cert/client-certificate.pem.crt"),
  ca: fs.readFileSync("./controller/cert/AmazonRootCA1.pem"),
});

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

  // Parse payload as JSON
  let jsonData;
  try {
    jsonData = JSON.parse(payload);
  } catch (error) {
    console.error("Error parsing MQTT payload as JSON:", error);
    return;
  }

  // Emit the MQTT data to connected clients through Socket.IO
  if (io) {
    io.emit("mqttData", jsonData);
  }

  // Add your own logic to handle the received message
});

// Function to set the Socket.IO instance
const setSocketIO = (socketIOInstance) => {
  io = socketIOInstance;
};

module.exports = {
  setSocketIO,
};
