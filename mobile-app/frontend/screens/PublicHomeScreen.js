import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, View, Image, TouchableOpacity, BackHandler, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

const PublicHomeScreen = ({ navigation }) => {

  const { logoutPublic } = useContext(AuthContext);

  const [storedName, setStoredName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      const name = await AsyncStorage.getItem('name');
      setStoredName(name || '');
    };
    

    fetchUserName();
  }, []);



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
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.name}> {storedName.toUpperCase()+'!'} </Text>
      </View>
      <View style={styles.container}>
        <Image
          source={require("../assets/LoginScreen/head.png")}
          style={styles.image}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.button, { backgroundColor: "#1bb56b" }]}
        onPress={viewMap}
      >
        <Text style={styles.buttonText}>GET UPDATES</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.button, { backgroundColor: "#1b8cb5" }]}
        onPress={reportIssues}
      >
        <Text style={styles.buttonText}>REPORT</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.button, { backgroundColor: "#d9c10b" }]}
        onPress={ exitApp }
      >
        <Text style={styles.buttonText}>LOG OUT</Text>
      </TouchableOpacity>
    </SafeAreaView>
    
  );
};

export default PublicHomeScreen;

const styles = StyleSheet.create({
  
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
    paddingRight:5
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#105716",
    
  },
  titleContainer: {
    marginTop:10,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    height: 60,
    justifyContent:'center'
  },
  image: {
    marginTop: 20,
    width: 350,
    height: 200
  },
  button: {
    alignItems: "center",
    alignContent:'center',
    padding: 15,
    width: "90%",
    height:"18%",
    borderRadius: 20,
    margin: 5,
    elevation: 5,
    shadowOffset: {
        width: 100,
        height:100
    },

    shadowColor: '#105716',
    shadowOpacity: 1,
    shadowRadius: 8
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});
