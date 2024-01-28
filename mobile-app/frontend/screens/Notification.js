import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Aws from './Aws';

const Notification = ({ navigation }) => {
  const [warnings, setWarnings] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = Aws.data;
        console.log('New data:', newData);
  
        if (newData) {
          // Check conditions for displaying warning messages
          if (newData.filledLevel > 90) {
            showBinLevelWarning();
          }
  
          if (newData.temperature > 30) {
            showTemperatureWarning();
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData(); // Call the fetchData function
  
    // Set an interval to fetch data every 5 seconds
    const interval = setInterval(fetchData, 5000);
  
    // Clean up function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);
  

  const showBinLevelWarning = () => {
    console.log('Bin level warning triggered');
    const timestamp = new Date().toLocaleString();
    const warningMessage = `Bin level is greater than 90%. (${timestamp})`;
    setWarnings((prevWarnings) => [warningMessage, ...prevWarnings]);
  };
  
  const showTemperatureWarning = () => {
    console.log('Temperature warning triggered');
    const timestamp = new Date().toLocaleString();
    const warningMessage = `Temperature is greater than 30 degrees. (${timestamp})`;
    setWarnings((prevWarnings) => [warningMessage, ...prevWarnings]);
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>{'< Back'}</Text>
      </TouchableOpacity>
      <View style={styles.squareArea}>
        <ScrollView>
          {warnings.map((warning, index) => (
            <Text key={index} style={styles.warningText}>
              {warning}
            </Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  squareArea: {
    width: '100%',
    height: '90%', // Capture the screen height
    borderColor: 'rgba(0, 0, 0, 0.5)', // Slightly transparent border color
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    margin: 'auto', // Center the square area
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white background
    marginTop: 80, // Adjusted marginTop to create space below the button
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 16,
    color: 'white',
  },
  warningText: {
    marginVertical: 5,
    fontSize: 16,
    color: 'red',
  },
});

export default Notification;
