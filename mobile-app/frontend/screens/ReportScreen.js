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
  const [name, changedName] = React.useState("");
  const [title, changedTitle] = React.useState("");
  const [feedback, changefeedback] = React.useState("");

  const handleTouchablePress = () => {
    Keyboard.dismiss();
  };

  const handleSubmit = async () => {
    try {
      const feedbackData = {
        name: name,
        title: title,
        feedback: feedback,
      };

      const response = await axios.post(
        "http://10.0.2.2:8000/api/feedback",
        feedbackData
      );

      if (response.data && response.data._id) {
        Alert.alert("Feedback submitted successfully");
      } else {
        Alert.alert("Failed to submit feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      Alert.alert("Failed to submit feedback");
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
            <View>
              <View style={styles.textboxContainer}>
                <Text style={styles.textboxHeader}>Name</Text>
                <TextInput
                  style={[styles.input, { height: 50 }]}
                  onChangeText={changedName}
                  value={name}
                  placeholder="Ex: Appuhamy"
                  selectionColor={"#18963a"}
                  textAlignVertical="top"
                />
              </View>

              <View style={styles.textboxContainer}>
                <Text style={styles.textboxHeader}>Topic</Text>
                <TextInput
                  style={[styles.input, { height: 50 }]}
                  onChangeText={changedTitle}
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
                  onChangeText={changefeedback}
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
    marginBottom: 50,
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
