import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, BackHandler, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";


const PublicHomeScreen = ({ navigation }) => {

  const { logoutPublic } = useContext(AuthContext);


  const exitApp = async () => {
    Alert.alert('LOGOUT', 'Do you want to log-out from your account?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
      { text: 'Yes', onPress: () => { BackHandler.exitApp(), logoutPublic(); } },
      ]); 
  };


  const viewMap = () => {
    navigation.navigate("BinMap");
  };

  const reportIssues = () => {
    navigation.navigate("ReportScreen");
  };


  return (
    <SafeAreaView style={styles.buttonContainer}>
      <Text style={styles.title}>Welcome Back</Text>
      <View style={styles.container}>
        <Image
          source={require("../assets/LoginScreen/head.png")}
          style={styles.image}
        />
      </View>
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
        onPress={ exitApp }
      >
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
    
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
  image: {
    marginTop: 10,
    width: 350,
    height: 150
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
