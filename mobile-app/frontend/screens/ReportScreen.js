import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Alert,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const ReportScreen = () => {
  const [name, changeName] = React.useState("");
  const [number, changeNumber] = React.useState("");
  const [title, changeTitle] = React.useState("");
  const [feedback, changeFeedback] = React.useState("");
  const [error, setError] = React.useState('');

  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(() => {
      stateUpdater('')
    }, 2500);
  }

  const handleTouchablePress = () => {
    Keyboard.dismiss();
  };

  const isValidNumber = (number) => {
    const regx = /^0\d{9}$/;
    return regx.test(number);
  }

  const handleSubmit = () => {
    if (!name.trim() || !number.trim() || !title.trim() || !feedback.trim()) {
      return updateError('Fill all the fields!', setError);
    }

    //Validate mobile number
    if (!isValidNumber(number)) {
      return updateError('Invalid mobile number!', setError);
    }


      
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <TouchableWithoutFeedback onPress={handleTouchablePress}>
          <View style={styles.mainContainer}>
            <Text style={styles.headingText}>
              You can make your complaints here
            </Text>
            {error ? <Text style={{color:'red', textAlign:'center'}}>{error}</Text>:null}
            <View>
              <View style={styles.textboxContainer}>
                <Text style={styles.textboxHeader}>Name</Text>
                <TextInput
                  style={[styles.input, { height: 50 }]}
                  onChangeText={(text) => changeName(text)}
                  value={name}
                  placeholder="Ex: Appuhamy"
                  selectionColor={"#18963a"}
                  textAlignVertical="top"
                />
              </View>

              <View style={styles.textboxContainer}>
                <Text style={styles.textboxHeader}>Contact number</Text>
                <TextInput
                  style={[styles.input, { height: 50 }]}
                  onChangeText={(text) => changeNumber(text)}
                  value={number}
                  placeholder="Ex: 07X 1234567"
                  selectionColor={"#18963a"}
                  textAlignVertical="top"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.textboxContainer}>
                <Text style={styles.textboxHeader}>Topic</Text>
                <TextInput
                  style={[styles.input, { height: 50 }]}
                  onChangeText={(text) => changeTitle(text)}
                  value={title}
                  placeholder="Write the topic of complaint here"
                  autoCorrect={true}
                  selectionColor={"#18963a"}
                  textAlignVertical="top"
                />
              </View>

              <View style={styles.textboxContainer}>
                <Text style={styles.textboxHeader}>feedback</Text>
                <TextInput
                  style={[styles.input, { height: 200 }]}
                  onChangeText={(text) => changeFeedback(text)}
                  value={feedback}
                  placeholder="Write a descriptive complaint here"
                  multiline
                  autoCorrect={true}
                  selectionColor={"#18963a"}
                  textAlignVertical="top"
                />
              </View>
            </View>

            <Pressable onPress={handleSubmit} style={styles.buttonContainer}>
              <Text style={styles.button}>Submit</Text>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    alignItems: "center",
    margin: 5,
  },
  headingText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "green",
    marginTop: 75,
    marginBottom: 20,
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
  },
  buttonContainer: {
    width: 150,
    height: 50,
    backgroundColor: "green",
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
  },
  button: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 40,
  },
});
