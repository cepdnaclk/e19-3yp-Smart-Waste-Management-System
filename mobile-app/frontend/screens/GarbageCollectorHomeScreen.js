import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const GarbageCollectorHomeScreen = ({ navigation }) => {
  const optimizedCollectionRoutes = () => {
    // Implement optimized collection routes logic here
  };

  const unlockLockedBin = () => {
    // Implement unlock locked bin logic here
  };

  const checkBinFilledLevel = () => {
    // Implement check bin filled level logic here
  };

  const checkTemperatureLevel = () => {
    // Implement check temperature level logic here
  };

  const reportIssues = () => {
    // Implement report issues logic here
  };

  const goBackToCommonPage = () => {
    navigation.replace("common");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Garbage Collector Home Screen</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#4CAF50" }]}
        onPress={optimizedCollectionRoutes}
      >
        <Text style={styles.buttonText}>Optimize Collection Routes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#4CAF50" }]}
        onPress={unlockLockedBin}
      >
        <Text style={styles.buttonText}>Unlock Locked Bin</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#4CAF50" }]}
        onPress={checkBinFilledLevel}
      >
        <Text style={styles.buttonText}>Check Bin Filled Level</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#4CAF50" }]}
        onPress={checkTemperatureLevel}
      >
        <Text style={styles.buttonText}>Check Temperature Level</Text>
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

export default GarbageCollectorHomeScreen;

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
