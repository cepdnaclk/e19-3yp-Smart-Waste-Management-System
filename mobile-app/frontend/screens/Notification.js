// ProfileCollector.js

import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

const ProfileCollector = () => {
  const [collectorDetails, setCollectorDetails] = useState({});

  // Assume you have a function to fetch collector details
  const fetchCollectorDetails = async () => {
    // Implement your logic to fetch collector details
    // ...

    // Example:
    setCollectorDetails({
      name: "John Doe",
      email: "john.doe@example.com",
      status: "Active",
    });
  };

  useEffect(() => {
    fetchCollectorDetails();
  }, []); // Fetch details when the component mounts

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Collector Profile</Text>

      {Object.keys(collectorDetails).length > 0 ? (
        <View>
          <Text>Name: {collectorDetails.name}</Text>
          <Text>Email: {collectorDetails.email}</Text>
          <Text>Status: {collectorDetails.status}</Text>
        </View>
      ) : (
        <Text>Loading collector details...</Text>
      )}
    </View>
  );
};

export default ProfileCollector;
