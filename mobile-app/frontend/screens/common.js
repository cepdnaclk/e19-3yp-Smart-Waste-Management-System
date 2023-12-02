import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Common = ({ navigation }) => {
  const navigateToRole = (role) => {
    if (role === "Garbage Collector") {
      // Navigate to GarbagecollectorHomeScreen
      navigation.replace("GarbageCollectorHomeScreen");
    } else if (role === "House Owner") {
      // Navigate to HouseOwnerHomeScreen
      navigation.replace("HouseOwnerHomeScreen");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Role</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "green" }]}
        onPress={() => navigateToRole("Garbage Collector")}
      >
        <Text style={styles.buttonText}>Garbage Collector</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "green" }]}
        onPress={() => navigateToRole("House Owner")}
      >
        <Text style={styles.buttonText}>House Owner</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Common;

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
    width: 200,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
