import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  ActivityIndicator
  
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from 'react-native-vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";


import client from "../api/client";

const ReportScreen = ({ navigation }) => {
  const [name, changeName] = useState("");
  const [number, changeNumber] = useState("");
  const [title, changeTitle] = useState("");
  const [feedback, changeFeedback] = useState("");
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <View style={[{ flex: 1 }, { justifyContent: 'center' }, { alignItems: 'center' }, {zIndex:1}]}>
        <ActivityIndicator size='large' />
      </View>
    ) 
  }

  // const [email, setUserEmail] = useState('');

  // useEffect(() => {
  //   const fetchUserEmail = async () => {
  //     const email = await AsyncStorage.getItem('email');
  //     setUserEmail(email);
  //   };
    

  //   fetchUserEmail();
  // }, []);


  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(() => {
      stateUpdater("");
    }, 2500);
  };

  const handleTouchablePress = () => {
    Keyboard.dismiss();
  };

  const handleNavigation = () => {
    navigation.goBack();
  };

  const isValidNumber = (number) => {
    const regx = /^0\d{9}$/;
    return regx.test(number);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!name.trim() || !number.trim() || !title.trim() || !feedback.trim()) {
      setIsLoading(false);
      return updateError("Fill all the fields!", setError);
    }

    // Validate mobile number
    if (!isValidNumber(number)) {
      setIsLoading(false);
      return updateError("Invalid mobile number!", setError);
    }

    try {
      await client
        .post('/report-user', {
          name,
          number,
          title,
          feedback
        })
        .then(res => {
          console.log(res.data);
          if (res.data.status) {
            setIsLoading(false);
            Alert.alert("Done",res.data.message, [
              {
                text: 'Ok',
                onPress: () => { navigation.navigate('PublicHomeScreen'); }
              }
            ]); 
          }
          else {
            setIsLoading(false);
            Alert.alert(res.data.message);
          }
        })
    } catch (error) {
      //Handle error
      setIsLoading(false);
      console.error('Error reporting',error.message);
    }
  };

  

  return (
    <SafeAreaView>
      <ScrollView>
        <TouchableWithoutFeedback onPress={handleTouchablePress}>
          <View style={styles.container}>
            <TouchableOpacity onPress={handleNavigation} style={ styles.icon} >  
              <AntDesign name="left" size={30} color="green"/>
            </TouchableOpacity>
            <Text style={styles.headingText}>
              You can make your Complaints or Feedbacks here
            </Text>
            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : null}
            <View>
              <View style={styles.textboxContainer}>
                <Text style={styles.textboxHeader}>Name</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => changeName(text)}
                  value={name}
                  placeholder="Ex: Appuhamy"
                  selectionColor={"green"}
                  textAlignVertical="top"
                />
              </View>

              <View style={styles.textboxContainer}>
                <Text style={styles.textboxHeader}>Contact number</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => changeNumber(text)}
                  value={number}
                  placeholder="Ex: 07X 1234567"
                  selectionColor={"green"}
                  textAlignVertical="top"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.textboxContainer}>
                <Text style={styles.textboxHeader}>Topic</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => changeTitle(text)}
                  value={title}
                  placeholder="Write the topic of complaint/feedback here"
                  autoCorrect={true}
                  selectionColor={"green"}
                  textAlignVertical="top"
                />
              </View>

              <View style={styles.textboxContainer}>
                <Text style={styles.textboxHeader}>Feedback</Text>
                <TextInput
                  style={[styles.input, { height: 200 }]}
                  onChangeText={(text) => changeFeedback(text)}
                  value={feedback}
                  placeholder="Write a descriptive complaint/feedback here"
                  multiline
                  autoCorrect={true}
                  selectionColor={"green"}
                  textAlignVertical="top"
                />
              </View>
            </View>

            <TouchableOpacity onPress={handleSubmit} style={styles.buttonContainer } activeOpacity={0.7} >
              <Text style={styles.button}>Submit</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    margin: 5,
  },
  icon: {
    flex: 1,
    alignSelf: 'flex-start',
    paddingLeft: 10,
    paddingTop:20
  },
  headingText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "green",
    marginTop: 5,
    marginBottom: 20,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
  textboxHeader: {
    fontSize: 20,
    fontWeight: "400",
    color: "green",
  },
  textboxContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    marginBottom: 5,
  },
  input: {
    width: 350,
    borderWidth: 0.8,
    borderRadius: 4,
    borderColor: "green",
    fontSize: 15,
    paddingLeft: 4,
    height: 50,
  },
  buttonContainer: {
    height: 50,
    width: 200,
    backgroundColor: "green",
    borderRadius: 30,
    borderWidth: 2,
    borderColor:"#59de71",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowOffset: {
        width: 100,
        height:100
    },

    shadowColor: '#105716',
    shadowOpacity: 1,
    shadowRadius: 108
  },
  button: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 40,
  },
});
