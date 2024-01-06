import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const HouseOwnerHomeScreen = ({ navigation }) => {
  const viewBinInformation = () => {
    // Implement view nearest bin location logic here
  };

  const reportIssues = () => {
    // Implement report issues logic here
  };

  const goBackToCommonPage = () => {
    navigation.replace("common");
  };

  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.title}>House Owner Home Screen</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={viewBinInformation}
      >
        <Text style={styles.buttonText}>View Bin Information</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={reportIssues}
      >
        <Text style={styles.buttonText}>Report Issues</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={goBackToCommonPage}
      >
        <Text style={styles.buttonText}>Back to Previous Page</Text>
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
