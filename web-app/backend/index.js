("use strict");
require("dotenv").config();
var AWS = require("aws-sdk");

const my_AWSAccessKeyId = process.env.AWSAccessKeyId;
const my_AWSSecretKey = process.env.AWSSecretKey;
const aws_region = process.env.region;
const bin01 = process.env.tableName;

//dynamodb connection
var dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: aws_region,
  accessKeyId: my_AWSAccessKeyId,
  secretAccessKey: my_AWSSecretKey,
});

async function fetchDatafromDatabase1() {
  // Scan method fetch data from DynamoDB

  var params = {
    TableName: bin01,
  };

  let queryExecute = new Promise((res, rej) => {
    dynamoDB.scan(params, function (err, data) {
      if (err) {
        console.log("Error", err);
        rej(err);
      } else {
        console.log("Success! Scan method fetch data from DynamoDB");
        const items = data.Items.map((item) => ({
          TimeStamp: item.TimeStamp,
          temperature: item.temperature,
          averageDistance: item.averageDistance,
          latitude: item.latitude,
          longitude: item.longitude,
        }));
        res(items);
      }
    });
  });
  const result = await queryExecute;
  console.log(result);
}

fetchDatafromDatabase1();
