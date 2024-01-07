import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const HouseOwnerHomeScreen = ({ navigation }) => {
  const viewMap = () => {
    navigation.navigate("BinMap");
  };

  const reportIssues = () => {
    navigation.navigate("ReportScreen");
  };

  const goBackToLoginPage = () => {
    navigation.navigate("LoginScreenPublic");
  };

  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.title}>Public Home Screen</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={viewMap}
      >
        <Text style={styles.buttonText}>Go to Map</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={reportIssues}
      >
        <Text style={styles.buttonText}>Report Issues</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={goBackToLoginPage}
      >
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HouseOwnerHomeScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 50,
    marginTop: 10,
    color: "green"
  },
  button: {
    alignItems: "center",
    backgroundColor: "green",
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
