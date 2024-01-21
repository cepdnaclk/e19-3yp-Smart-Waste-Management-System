import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback, Image, KeyboardAvoidingView, TextInput, Pressable, Alert, Keyboard} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";  // Make sure this import is correct
import { AntDesign } from "@expo/vector-icons";

const LoginScreenPublic = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //Login logic to be implemented
  const handleLogin = async () => {
    navigation.navigate("GarbageCollectorHomeScreen")

  };
  const handleTouchablePress = () => {
    // Dismiss the keyboard when the user presses outside the TextInput
    Keyboard.dismiss();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.roleSelector}>
          <Pressable
              onPress={()=>navigation.navigate("LoginScreenPublic")}
              style={[styles.buttonContainer, {backgroundColor: 'white'}, {borderTopLeftRadius: 10}, {borderBottomLeftRadius: 10}]}
            >
              <Text style={[styles.button, {color: 'green'}]}>
                PUBLIC
              </Text>
          </Pressable>
          <Pressable
              onPress={()=>navigation.navigate("LoginScreenGarbageCollector")}
              style={[styles.buttonContainer, {backgroundColor: 'green'}, {borderTopRightRadius:10}, {borderBottomRightRadius:10}]}
            >
              <Text style={[styles.button, {color: 'white'}]}>
                COLLECTOR
              </Text>
          </Pressable>
          
        </View>
        <TouchableWithoutFeedback onPress={handleTouchablePress}>
          <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoidingContainer}>
        
            
            <Image
              style={styles.image}
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
                  placeholder="enter your Email"
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
                  placeholder="enter your Password"
                />
              </View>
            </View>

            <View style={styles.additionalInfoContainer}>
              <Text style={styles.additionalInfoText}>Keep me logged in</Text>
              <Text style={styles.additionalInfoText}>Forgot Password</Text>
            </View>

            <Pressable onPress={handleLogin} style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("RegisterScreen")} style={styles.signupLink}>
              <Text style={styles.signupLinkText}>Don't have an account? Sign Up</Text>
            </Pressable>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  roleSelector: {
    flexDirection: "row",
  },
  buttonContainer: {
    width: 192,
    height: 50,
    borderColor: 'green',
    borderWidth: 1,
    marginTop: 5
  },
  button: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 40
  },
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
  image: {
    marginTop: 50,
    width: 300,
    height: 150
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
  additionalInfoContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  additionalInfoText: {
    color: "gray",
  },
  loginButton: {
    width: 200,
    backgroundColor: "green",
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 20,
    marginTop: 70,
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
  }
  
});

export default LoginScreenPublic;

