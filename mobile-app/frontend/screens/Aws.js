import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios'; // Assuming you're using Axios for HTTP requests

const Aws = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.8.102:8000/iot/subscribe');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    // // Clean up function to clear the interval when component unmounts
    // return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      {data ? (
        <View>
          <Text>Bin ID: {data.binId}</Text>
          <Text>Filled Level: {data.filledLevel}</Text>
          <Text>Temperature: {data.temperature}</Text>
          <Text>Latitude: {data.latitude}</Text>
          <Text>Longitude: {data.longitude}</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Aws;