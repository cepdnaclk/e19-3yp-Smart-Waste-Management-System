import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, AsyncStorage, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { AntDesign } from 'react-native-vector-icons';

const Aws = () => {
  const [data, setData] = useState(null);
  const [warnings, setWarnings] = useState([]);

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

    const saveWarnings = async (updatedWarnings) => {
      try {
        await AsyncStorage.setItem('warnings', JSON.stringify(updatedWarnings));
      } catch (error) {
        console.error('Error saving warnings:', error);
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
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Warning Messages</Text>
      </View>
      <FlatList
        data={warnings}
        renderItem={({ item }) => (
          <Text style={styles.warningText}>{item}</Text>
        )}
        keyExtractor={(item, index) => index.toString()}
        inverted={true} // Display the latest messages at the top
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7E0', // Light green background color
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#105716', // Dark green button color
    padding: 10,
    borderRadius: 5,
  },
  headerContainer: {
    backgroundColor: '#105716', // Dark green header background color
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  warningText: {
    fontSize: 16,
    color: '#FF0000', // Red warning text color
    marginVertical: 5,
    paddingHorizontal: 15,
  },
});

export default Aws;
