const AWS = require("aws-sdk");
require("dotenv").config();

// Initialize the AWS SDK and create an IoT object
AWS.config.update({
  accessKeyId: "",
  secretAccessKey: "",
  region: "us-east-1",
});

const iot = new AWS.Iot();

const subscribeToIoTData = (io) => {
  const policyParams = {
    policyName: "bridgeMQTT",
    principal:
      "arn:aws:iot:us-east-1:471112630096:cert/78f51c49e22d9ccf2f04725fb50cad5ea4f85da0838fa109b7c849e536ac302e", // Replace with your actual principal (usually a certificate ARN)
  };

  // Attach the policy to the principal
  iot.attachPrincipalPolicy(policyParams, (err, data) => {
    if (err) {
      console.error("Error attaching policy:", err);
      return;
    }

    console.log("Attached policy:", data);

    // Handle incoming messages
    iot.on("message", (event) => {
      const topic = event.topic;
      const payload = event.payload.toString();
      console.log(`Received message on topic ${topic}: ${payload}`);

      // Emit the IoT data to your application
      io.emit("iotData", payload);
    });

    console.log("Subscribed to IoT messages");
  });
};

module.exports = { subscribeToIoTData };
