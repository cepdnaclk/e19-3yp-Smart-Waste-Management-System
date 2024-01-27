import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback, Image, KeyboardAvoidingView, TextInput,  Alert, Keyboard, TouchableOpacity, Dimensions} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";  // Make sure this import is correct
import { AntDesign } from "@expo/vector-icons";
import client from "../api/client";

const LoginScreenPublic = ({ navigation, onPressPublic, onPressCollector }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');


  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(() => {
      stateUpdater('')
    }, 2500);
  }

  const isValidEmail = (email) => {
    const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return regx.test(email);
  }

  
  const handleLogin = async () => {
    //Validate email
    if (!isValidEmail(email)) {
      return updateError('Invalid Email!', setError);
    }

    //Validate password
    if (!password.trim() || password.length < 8) {
      return updateError('Invalid Password!', setError);
    }

    try {
      await client
        .post('/sign-in-public', {
          email,
          password
        })
        .then(res => {
          console.log(res.data);
          if (res.data.status) {
            navigation.navigate('PublicHomeScreen');
            setEmail("");
            setPassword("");
          }
          else {
              Alert.alert(res.data.message, 'Sign in again');
            }
        })
      
    } catch (error) {
      // Handle error
      console.error('Error while login:', error.message, error.response);
    }
  };
  

  return (
    <SafeAreaView style={[styles.container, {width: Dimensions.get('window').width}]} >
        <View style={styles.roleIndicator}>
          <TouchableOpacity
              
          activeOpacity={0.7}
          onPress={onPressPublic}
              style={[styles.buttonContainer, {backgroundColor: 'green'}, {borderTopLeftRadius: 10}, {borderBottomLeftRadius: 10}]}
            >
              <Text style={[styles.button, {color: 'white'}]}>
                PUBLIC
              </Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={onPressCollector}
          activeOpacity={0.7}
              style={[styles.buttonContainer, {backgroundColor: 'white'}, {borderTopRightRadius:10}, {borderBottomRightRadius:10}]}
            >
              <Text style={[styles.button, {color: 'green'}]}>
                COLLECTOR
              </Text>
          </TouchableOpacity>
          
        </View>
        
        <View style ={styles.keyboardAvoidingContainer}>
        
            <Image
              style={styles.image}
              source={require("../assets/LoginScreen/head.png")}
            />

          <View style={[{flexDirection:'row'},{justifyContent:'center'}]}>
            <Text style={styles.heading}>Login as </Text>
            <Text style={[styles.heading,{color:'#105716'}, {fontWeight:'800'}]}>PUBLIC</Text>
          </View>
          {error ? <Text style={{color:'red', textAlign:'center'}}>{error}</Text>:null}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <MaterialIcons name="email" size={30} color="green" />
                <TextInput
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  style={styles.input}
                  placeholder="Enter your Email"
                  autoCapitalize="none"
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
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.additionalInfoContainer}>
              <Text style={styles.additionalInfoText}>Forgot Password</Text>
            </View>

          <TouchableOpacity activeOpacity={0.7} onPress={ handleLogin} style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} onPress={() => {
            navigation.navigate("RegisterScreen"), setEmail(""), setPassword("")
          }}
            style={styles.signupLink}>
              <Text style={styles.signupLinkText}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
          </ScrollView>
        </View>  
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  roleIndicator: {
    flexDirection: "row",
  },
  buttonContainer: {
    width: '50%',
    height: 50,
    borderColor: 'green',
    borderWidth: 1,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
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
    marginTop: 30,
    width: 300,
    height: 150
  },
  heading: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    marginBottom: 5,
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
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 8,
    padding:5
  },
  input: {
    color: "green",
    marginVertical: 10,
    width: "80%",
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
    height: 50,
    width: "100%",
    backgroundColor: "green",
    borderRadius: 10,
    borderWidth: 2,
    borderColor:"#59de71",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 70,
    justifyContent: 'center',
    alignItems: 'center'
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

