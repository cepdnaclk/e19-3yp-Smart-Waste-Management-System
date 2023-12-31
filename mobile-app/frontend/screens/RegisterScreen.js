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
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("houseOwner");
  const navigation = useNavigation();

  const handleRegister = () => {
    const user = { name, selectedRole, email, password };
    // send a POST  request to the backend API to register the user
    axios
      .post("http://10.0.2.2:8000/api/collector/signup", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration successful",
          "You have been registered Successfully"
        );
        setName("");
        setSelectedRole("houseOwner");
        setEmail("");
        setPassword("");

        // Navigate based on selectedRole
        const role = response.data.role;
        if (role === "GarbageCollector") {
          navigation.navigate("GarbageCollectorHomeScreen");
        } else if (role === "HouseOwner") {
          navigation.navigate("HouseOwnerHomeScreen");
        }
      })
      .catch((error) => {
        Alert.alert(
          "Registration Error",
          "An error occurred while registering"
        );
        console.log("registration failed", error);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        marginTop: 0,
      }}
    >
      <View>
        <Image
          style={{ marginTop: 70, width: 250, height: 150 }}
          source={require("../assets/LoginScreen/head.png")}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              marginTop: 10,
              fontSize: 20,
              fontWeight: "bold",
              color: "green",
            }}
          >
            Register To Your Account
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              gap: 10,
              backgroundColor: "#D0D0D0",
              paddingVertical: 10,
              borderRadius: 8,
            }}
          >
            <Ionicons
              name="person"
              style={{ marginLeft: 8 }}
              size={30}
              color="green"
            />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                color: "green",
                marginVertical: 10,
                width: 300,
                fontSize: name ? 16 : 16,
              }}
              placeholder="Enter your Name"
            />
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              gap: 10,
              backgroundColor: "#D0D0D0",
              paddingVertical: 10,
              borderRadius: 8,
            }}
          >
            <MaterialIcons
              name="person-search"
              style={{ marginLeft: 8 }}
              size={30}
              color="green"
            />

            {/* <Picker
              selectedValue={selectedRole}
              style={{ height: 40, width: 300, color: "green" }}
              onValueChange={(itemValue) => setSelectedRole(itemValue)}
            >
              <Picker.Item label="House Owner" value="houseOwner" />
              <Picker.Item label="Garbage Collector" value="garbageCollector" />
            </Picker> */}
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              gap: 10,
              backgroundColor: "#D0D0D0",
              paddingVertical: 10,
              borderRadius: 8,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={30}
              color="green"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "green",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 16 : 16,
              }}
              placeholder="Enter your Email"
            />
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              gap: 10,
              backgroundColor: "#D0D0D0",
              paddingVertical: 10,
              borderRadius: 8,
            }}
          >
            <AntDesign
              style={{ marginLeft: 8 }}
              name="lock"
              size={30}
              color="green"
            />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                color: "green",
                marginVertical: 10,
                width: 300,
                fontSize: password ? 16 : 16,
              }}
              placeholder="enter your Password"
            />
          </View>
        </View>

        <View style={{ marginTop: 50 }} />
        <Pressable
          onPress={handleRegister}
          style={{
            width: 200,
            backgroundColor: "green",
            borderRadius: 10,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Register
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("LoginScreen")}
          style={{ marginTop: 12 }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "gray",
              fontSize: 16,
            }}
          >
            Already have an account? Login
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
