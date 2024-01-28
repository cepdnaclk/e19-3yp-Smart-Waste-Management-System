// Notification.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import Aws from './Aws'; // Assuming both files are in the same directory

const Notification = () => {
  const [data, setData] = useState(null);
  const [warnings, setWarnings] = useState([]);

  useEffect(() => {
    // Fetch data from the Aws component
    // You can modify the logic based on your actual data structure
    setData({
      binId: 'ExampleBin',
      filledLevel: 95, // Assuming the filledLevel is a percentage
      temperature: 65, // Assuming the temperature is in degrees
      latitude: 0,
      longitude: 0,
    });
  }, []);

  useEffect(() => {
    // Check conditions for displaying warning messages
    if (data && data.filledLevel > 90) {
      showBinLevelWarning();
    }

    if (data && data.temperature > 60) {
      showTemperatureWarning();
    }
  }, [data]);

  const showBinLevelWarning = () => {
    const timestamp = new Date().toLocaleString();
    const warningMessage = `Bin level is greater than 90%. (${timestamp})`;

    setWarnings((prevWarnings) => [warningMessage, ...prevWarnings]);
  };

  const showTemperatureWarning = () => {
    const timestamp = new Date().toLocaleString();
    const warningMessage = `Temperature is greater than 60 degrees. (${timestamp})`;

    setWarnings((prevWarnings) => [warningMessage, ...prevWarnings]);
  };

  return (
    <View style={styles.container}>
      <Aws setData={setData} /> {/* Pass setData function as a prop to update data */}
      <ScrollView>
        {warnings.map((warning, index) => (
          <Text key={index} style={styles.warningText}>
            {warning}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warningText: {
    marginVertical: 5,
    fontSize: 16,
    color: 'red',
  },
});

export default Notification;
