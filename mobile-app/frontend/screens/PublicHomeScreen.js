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
        style={styles.button}
        onPress={viewMap}
      >
        <Text style={styles.buttonText}>GET UPDATES</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={reportIssues}
      >
        <Text style={styles.buttonText}>REPORT</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
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
    color: "#105716",
    paddingRight:5
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    backgroundColor: '#105716',
    paddingVertical: 14,
    
  },
  titleContainer: {
    marginTop:10,
    flexDirection: 'row',
    backgroundColor: "#59de71",
    paddingHorizontal: 60,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    alignContent: 'center',
    alignItems: 'center',
    height: 60,
    justifyContent:'center'
  },
  image: {
    marginTop: 70,
    marginBottom: 70,
    width: 350,
    height: 200
  },
  button: {
    alignItems: "center",
    backgroundColor: "#105716",
    padding: 15,
    width: 250,
    borderRadius: 20,
    margin: 10,
    borderColor: '#59de71',
    borderWidth:2,
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
