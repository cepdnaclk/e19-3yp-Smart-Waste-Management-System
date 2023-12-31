import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const LocalLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    navigation.navigate("common");
    // try {
    //   setLoading(true);
    //   const user = {
    //     identifier: email,
    //     password: password,
    //   };
    //   const response = await axios.post(
    //     "http://localhost:8000/api/collector/login",
    //     user
    //   );
    //   const token = response.data.jwt;
    //   // Save token to AsyncStorage
    //   await AsyncStorage.setItem("authToken", token);
    //   const userDetails = response.data.user;
    //   if (userDetails) {
    //     // TODO: Navigate to your desired screen
    //     console.log("Login successful. Navigating to your desired screen");
    //   } else {
    //     Alert.alert("Login Error", "Invalid Email or Password");
    //   }
    // } catch (error) {
    //   setLoading(false);
    //   console.log("Login error:", error);
    //   if (error.response) {
    //     // Handle different types of errors based on response status
    //     Alert.alert(
    //       "Login Error",
    //       error.response.data.message || "An error occurred."
    //     );
    //   } else if (error.request) {
    //     Alert.alert(
    //       "Login Error",
    //       "No response from the server. Please try again."
    //     );
    //   } else {
    //     Alert.alert(
    //       "Login Error",
    //       "An unexpected error occurred. Please try again later."
    //     );
    //   }
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.keyboardAvoidingContainer}
      >
        <Image
          style={styles.logo}
          source={require("../assets/LoginScreen/head.png")}
        />

        <Text style={styles.heading}>Login In To Your Account</Text>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <MaterialIcons name="email" size={30} color="green" />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              placeholder="Enter your Email"
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <AntDesign name="lock" size={30} color="green" />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={styles.input}
              placeholder="Enter your Password"
            />
          </View>
        </View>

        <Pressable onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("RegisterScreen")}
          style={styles.signupLink}
        >
          <Text style={styles.signupLinkText}>
            Don't have an account? Sign Up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  keyboardAvoidingContainer: {
    flex: 1,
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  logo: {
    marginTop: 70,
    width: 250,
    height: 150,
  },
  heading: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 20,
  },
  inputWrapper: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#D0D0D0",
    paddingVertical: 10,
    borderRadius: 8,
  },
  input: {
    color: "green",
    marginVertical: 10,
    width: 300,
    fontSize: 16,
  },
  loginButton: {
    width: 200,
    backgroundColor: "green",
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 20,
    marginTop: 100,
  },
  loginButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  signupLink: {
    marginTop: 15,
  },
  signupLinkText: {
    textAlign: "center",
    color: "gray",
    fontSize: 16,
    color: "green",
  },
});

export default LocalLoginScreen;