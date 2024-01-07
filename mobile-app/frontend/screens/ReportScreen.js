import { StyleSheet, Text, View, Keyboard, ScrollView, TextInput, TouchableWithoutFeedback, Alert, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const ReportScreen = () => {

  const [name, changedName] = React.useState("");
  const [number, changedNumber] = React.useState("");
  const [title, changedTitle] = React.useState("");
  const [description, changeDescription] = React.useState("");

  const handleTouchablePress = () => {
    // Dismiss the keyboard when the user presses outside the TextInput
    Keyboard.dismiss();
  }


  return (
    <SafeAreaView>
      <ScrollView>
        <TouchableWithoutFeedback onPress={handleTouchablePress}>
          <View style={styles.mainContainer}>
            <Text style={styles.headingText}>You can make your complaints here</Text>
            <View>
              <View style={styles.textboxContainer}>
                <Text style={styles.textboxHeader}>Name</Text>
                <TextInput    //can be modified
                style={[styles.input, {height:50}]}
                onChangeText={changedName}
                value={name}
                placeholder="Ex: Appuhamy"
                selectionColor={"#18963a"}
                textAlignVertical="top"
                />
              </View>

              <View style={styles.textboxContainer}>
                <Text style={styles.textboxHeader}>Contact number</Text>
                <TextInput    //can be modified
                style={[styles.input, {height:50}]}
                onChangeText={changedNumber}
                value={number}
                placeholder="Ex: 07X XXXXXXX"
                selectionColor={"#18963a"}
                textAlignVertical="top"
                />
              </View>

              <View style={styles.textboxContainer}>
                <Text style={styles.textboxHeader}>Topic</Text>
                <TextInput    //can be modified
                style={[styles.input, {height:50}]}
                onChangeText={changedTitle}
                value={title}
                placeholder="Write the topic of complaint here"
                autoCorrect={true}
                selectionColor={"#18963a"}
                textAlignVertical="top"
              />
              </View>
              
              <View style={styles.textboxContainer}>
                <Text style={styles.textboxHeader}>Description</Text>
                <TextInput
                style={[styles.input, {height:200}]}
                onChangeText={changeDescription}
                value={description}
                placeholder="Write a descriptive complaint here"
                multiline
                autoCorrect={true}
                selectionColor={"#18963a"}
                textAlignVertical="top"
              />
              </View>
            </View>
            
            <Pressable
              onPress={()=>Alert.alert('submitted')}
              style={styles.buttonContainer}
            >
              <Text style={styles.button}>
                Submit
              </Text>
            </Pressable>
            
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
       
    </SafeAreaView>
    
  )
}

export default ReportScreen

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 5
  },
  headingText: {
    fontSize: 30,
    fontWeight: 'bold',
    color:'green',
    marginTop: 75,
    marginBottom: 50,
    textAlign: 'center'
  },
  textboxHeader: {
    fontSize: 20,
    fontWeight: '400',
    color: 'green'
  },
  textboxContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginBottom:5
  },
  input: {
    width: 350,
    borderWidth: 0.8,
    borderRadius: 4,
    borderColor: "green",
    fontSize: 15,
    paddingLeft: 4
  },
  buttonContainer: {
    width: 150,
    height: 50,
    backgroundColor: "green",
    borderRadius: 10,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20
  },
  button: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 40
  }
})