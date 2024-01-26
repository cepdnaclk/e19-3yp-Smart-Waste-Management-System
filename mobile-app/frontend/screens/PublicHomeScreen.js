import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, BackHandler } from "react-native";
import { AuthContext } from "../context/AuthContext";


const PublicHomeScreen = ({ navigation }) => {

  const { logout } = useContext(AuthContext);


  const viewMap = () => {
    navigation.navigate("BinMap");
  };

  const reportIssues = () => {
    navigation.navigate("ReportScreen");
  };

  const goBackToLoginPage = () => {
    
    
    logout().then(() => {
      BackHandler.exitApp();
    })
    
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
        onPress={ goBackToLoginPage }
      >
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PublicHomeScreen;

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
