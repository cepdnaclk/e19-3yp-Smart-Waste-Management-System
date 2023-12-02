import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const HouseOwnerHomeScreen = ({ navigation }) => {
  const viewNearestBinLocation = () => {
    // Implement view nearest bin location logic here
  };

  const viewBinFilledLevel = () => {
    // Implement view bin filled level logic here
  };

  const viewTemperatureLevel = () => {
    // Implement view temperature level logic here
  };

  const reportIssues = () => {
    // Implement report issues logic here
  };

  const goBackToCommonPage = () => {
    navigation.replace("common");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>House Owner Home Screen</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#4CAF50" }]}
        onPress={viewNearestBinLocation}
      >
        <Text style={styles.buttonText}>View Nearest Bin Location</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#4CAF50" }]}
        onPress={viewBinFilledLevel}
      >
        <Text style={styles.buttonText}>View Bin Filled Level</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#4CAF50" }]}
        onPress={viewTemperatureLevel}
      >
        <Text style={styles.buttonText}>View Temperature Level</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#4CAF50" }]}
        onPress={reportIssues}
      >
        <Text style={styles.buttonText}>Report Issues</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#4CAF50" }]}
        onPress={goBackToCommonPage}
      >
        <Text style={styles.buttonText}>Back to Common Page</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HouseOwnerHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "green",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#4CAF50",
    padding: 15,
    width: 250,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
