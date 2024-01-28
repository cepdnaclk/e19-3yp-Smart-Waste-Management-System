
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialIcons, AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

import client from "../api/client";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("public");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <View style={[{ flex: 1 }, { justifyContent: 'center' }, { alignItems: 'center' }, {zIndex:1}]}>
        <ActivityIndicator size='large' />
      </View>
    ) 
  }

  const handleTouchablePress = () => {
    Keyboard.dismiss();
  };

  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(() => {
      stateUpdater('')
    }, 2500);
  }

  const isValidNumber = (number) => {
    const regx = /^0\d{9}$/;
    return regx.test(number);
  }

  const isValidEmail = (email) => {
    const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return regx.test(email);
  }

  const isValidForm = ({ name, mobile, email, password, confirmPassword }) => {
    //Validate name
    if (!name.trim() || name.length < 5) {
      setIsLoading(false);
      return updateError('Name should contain atleast 5 letters!', setError);
    }
    //Validate mobile number
    if (!isValidNumber(mobile.trim())) {
      setIsLoading(false);
      return updateError('Invalid mobile number!', setError);
    }

    //Validate email
    if (!isValidEmail(email)) {
      setIsLoading(false);
      return updateError('Invalid Email!', setError);
    }

    //Validate password
    if (!password.trim() || password.length < 8) {
      setIsLoading(false);
      return updateError('Password should contain atleast 8 letters!', setError);
    }
    if (password != confirmPassword) {
      setIsLoading(false);
      return updateError('Password does not match', setError);
    }

    return true;
  }

  const handleRegister = async () => {

    setIsLoading(true);
    
    try {
      if (isValidForm({ name, mobile, email, password, confirmPassword })) {
        await client
          .post('/create-user', {
            name,
            role,
            mobile,
            email,
            password,
          })
          .then(res => {
            console.log(res.data);
            if (res.data.status) {
              setIsLoading(false);
              Alert.alert(res.data.message);
              navigation.navigate('LoginScreen');
            }
            else {
              setIsLoading(false);
              Alert.alert(res.data.message, 'Register with another email');
            }
          })
      }
    } catch (error) {
      // Handle error
      setIsLoading(false);
      console.error('Error creating user:', error.message, error.response);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={handleTouchablePress}>
        <View>
        
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../assets/LoginScreen/head.png")}
            />
          </View>

          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Create a New Account</Text>
          </View>
          {error ? <Text style={{color:'red', textAlign:'center'}}>{error}</Text>:null}
          <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          >
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Ionicons name="person" size={30} color="green" />
                <TextInput
                  value={name}
                  style={styles.input}
                  placeholder="Enter your Name"
                  onChangeText={(name) => setName(name)}
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <MaterialIcons
                  name="person-search"
                  size={30}
                  color="green"
                />
                <Picker
                  selectedValue={role}
                  style={styles.picker}
                  onValueChange={(itemValue) => setRole(itemValue)}
                >
                  <Picker.Item
                    label="Public"
                    value="public"
                  />
                  <Picker.Item
                    label="Collector"
                    value="collector"
                  />
                </Picker>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <AntDesign name="mobile1" size={30} color="green" />
                <TextInput
                  value={mobile}
                  onChangeText={(text) => setMobile(text)}
                  style={styles.input}
                  placeholder="Enter your mobile number"
                  keyboardType="numeric"
                />
              </View>
            </View>

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
                  placeholder="Enter the Password"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <AntDesign name="lock" size={30} color="green" />
                <TextInput
                  value={confirmPassword}
                  onChangeText={(text) => setConfirmPassword(text)}
                  secureTextEntry={true}
                  style={styles.input}
                  placeholder="Confirm Password"
                  autoCapitalize="none"
                />
              </View>
            </View>
        

            <View style={styles.buttonContainer}>

              <TouchableOpacity
                onPress={handleRegister}
                style={styles.registerButton}
                activeOpacity={0.7}
              >
                <Text style={styles.registerButtonText}>Register</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("LoginScreen")}
                style={styles.loginLink}
                activeOpacity={0.7}
                
              >
                <Text style={styles.loginLinkText}>
                  Already have an account? Login
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  imageContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 150,
  },
    headingContainer: {
    alignItems: "center",
    paddingBottom: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
  inputContainer: {
    marginTop: 5,
  },
  inputWrapper: {
    alignItems: "center",
    flexDirection: "row",
    gap: -10,
    backgroundColor: "#D0D0D0",
    paddingVertical: 10,
    borderRadius: 10,
    
  },
  input: {
    color: "green",
    marginVertical: 10,
    marginHorizontal: 18,
    width: 265,
    fontSize: 16,
    
  },
  picker: {
    height: 40,
    width: 300,
    color: "green",
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  registerButton: {
    width: 300,
    height: 50,
    backgroundColor: "green",
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#59de71",
  },
  registerButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  loginLink: {
    marginTop: 5,
  },
  loginLinkText: {
    textAlign: "center",
    color: "green",
    fontSize: 16,
  },
});

export default RegisterScreen;

 