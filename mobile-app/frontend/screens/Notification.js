import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Assuming you are using React Navigation
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Aws = () => {
  const navigation = useNavigation();
  const [data, setData] = useState(null);
  const [warnings, setWarnings] = useState([]);

  // Declare saveWarnings outside of loadStoredWarnings
  const saveWarnings = async (updatedWarnings) => {
    try {
      await AsyncStorage.setItem('warnings', JSON.stringify(updatedWarnings));
    } catch (error) {
      console.error('Error saving warnings:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.179:8000/iot/subscribe');
        setData(response.data);

        // Check conditions for displaying warning messages
        if (response.data.filledLevel < 10) {
          showBinLevelWarning();
        }

        if (response.data.temperature > 30) {
          showTemperatureWarning();
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const loadStoredWarnings = async () => {
      try {
        const storedWarnings = await AsyncStorage.getItem('warnings');
        if (storedWarnings) {
          setWarnings(JSON.parse(storedWarnings));
        }
      } catch (error) {
        console.error('Error loading stored warnings:', error);
      }
    };

    const interval = setInterval(() => {
      fetchData(); // Fetch data every 5 seconds
      loadStoredWarnings(); // Load stored warnings
    }, 5000);

    // Clean up function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const showBinLevelWarning = () => {
    console.log('Bin level warning triggered');
    const timestamp = new Date().toLocaleString();
    const warningMessage = `Bin level is less than 10 cm. (${timestamp})`;
    setWarnings((prevWarnings) => {
      const updatedWarnings = [warningMessage, ...prevWarnings];
      saveWarnings(updatedWarnings);
      return updatedWarnings;
    });
  };

  const showTemperatureWarning = () => {
    console.log('Temperature warning triggered');
    const timestamp = new Date().toLocaleString();
    const warningMessage = `Temperature is greater than 30 degrees. (${timestamp})`;
    setWarnings((prevWarnings) => {
      const updatedWarnings = [warningMessage, ...prevWarnings];
      saveWarnings(updatedWarnings);
      return updatedWarnings;
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.notificationContainer}>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  backButtonText: {
    color: 'white',
  },
  notificationContainer: {
    marginTop: 90,
    maxHeight: '80%',
    width: '80%',
    borderColor: 'rgba(0, 0, 0, 0.5)',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  warningText: {
    fontSize: 16,
    color: 'red',
  },
});

export default Aws;