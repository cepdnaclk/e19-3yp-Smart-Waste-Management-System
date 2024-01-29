import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, View, Image, TouchableOpacity, BackHandler, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const CollectorHomeScreen = ({ navigation }) => {

  const { logoutCollector } = useContext(AuthContext);

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
      { text: 'Yes', onPress: () => { BackHandler.exitApp(), logoutCollector(); } },
      ]); 
  };


  const viewMap = () => {
    navigation.navigate("BinMap");
  };

  const viewWarning = () => {
    navigation.navigate("Notification");
  };

  return (
    <SafeAreaView style={styles.buttonContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.name}> {storedName.toUpperCase()+'!'} </Text>
      </View>
      <View style={styles.container}>
        <Image
          source={require("../assets/LoginScreen/img.png")}
          style={styles.image}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.button, { backgroundColor: "#1bb56b" }]}
        onPress={viewMap}
      >
        <View style={styles.buttonItems}>
          <View>
            <Text style={styles.buttonText}>Get Updates</Text>
            <Text style={{color:'white'}}>View bin locations, filled levels and temperature</Text>
          </View>
          <Entypo name="location" size={40} color="white" style={styles.icon} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.button, { backgroundColor: "#1b8cb5" }]}
        onPress={viewWarning}
      >
        <View style={styles.buttonItems}>
          <View>
            <Text style={styles.buttonText}>Get Warnings</Text>
            <Text style={{color:'white'}}>You will get the warning notifications here when there are any</Text>
          </View>
          <Entypo name="notification" size={40} color="white" style={styles.icon} />
        </View>
      </TouchableOpacity>
        
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.button, { backgroundColor: "#a660d1" }]}
        onPress={ exitApp }
      >
        <View style={styles.buttonItems}>
          <View>
            <Text style={styles.buttonText}>Log Out</Text>
            <Text style={{color:'white'}}>Logout from your account and exit</Text>
          </View>
          <MaterialCommunityIcons name="logout" size={50} color="white" />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
    
  );
};

export default CollectorHomeScreen;

const styles = StyleSheet.create({
  
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: '300',
    color: "grey",
    paddingRight:5
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#105716",
    
  },
  titleContainer: {
    marginTop:10,
    alignContent: 'center',
    alignItems: 'center',
    height: 60,
    justifyContent:'center'
  },
  image: {
    marginTop: 20,
    width: 300,
    height: 250,
    marginBottom:10
  },
  button: {
    flexDirection: 'row',
    alignItems: "center",
    alignContent:'center',
    padding: 15,
    width: "90%",
    height:120,
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
  buttonItems: {
    flex:1,
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  icon: {
  
  }
});
