const { IoTClient, SubscribeToTopicCommand } = require("@aws-sdk/client-iot");

const customEndpoint = process.env.AWS_CUSTOM_END_POINT;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION;
const topic = "3yp/Area001/Bin_001";

const client = new IoTClient({
  region,
  credentials: { accessKeyId, secretAccessKey },
});

const subscribeToIoTData = async () => {
  try {
    const command = new SubscribeToTopicCommand({ topic });
    const response = await client.send(command);

    console.log("Subscribed to topic:", response);
  } catch (error) {
    console.error("Error subscribing to topic:", error);
  }
};

// Handle incoming messages
client.middlewareStack.add(
  (next) => async (args) => {
    if (args.request.input instanceof SubscribeToTopicCommand) {
      client.on("message", (event) => {
        const { topic, payload } = event;
        const message = payload.toString();
        console.log(`Received message on topic ${topic}: ${message}`);
        // Handle the IoT data as needed
      });
    }

    return next(args);
  },
  { step: "initialize", tags: ["SubscribeToTopicCommand"] }
);

module.exports = { client, subscribeToIoTData };
