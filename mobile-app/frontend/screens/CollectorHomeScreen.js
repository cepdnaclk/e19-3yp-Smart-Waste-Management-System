import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, Pressable, Dimensions, BackHandler, Alert} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize"; // Import RFPercentage
import { AuthContext } from "../context/AuthContext";

const CollectorHomeScreen = ({ navigation }) => {
  
    const { logoutCollector } = useContext(AuthContext);


  const [availableBins, setAvailableBins] = useState(0);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [chatWindowVisible, setChatWindowVisible] = useState(false);

  useEffect(() => {
    // Simulating dynamic increase from 0 to 100
    const interval = setInterval(() => {
      if (availableBins < 100) {
        setAvailableBins((prevBins) => prevBins + 1);
      } else {
        clearInterval(interval);
      }
    }, 50);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [availableBins]);

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


  const handleProfileOption = (option) => {
    closeModals();

    if (option === "ProfileDetails") {
      // Use 'replace' instead of 'navigate' to avoid stacking the same screen in the navigation stack
      navigation.replace("ProfileGarbageCollectors");
    } else if (option === "Logout") {
      exitApp();
    }

    openProfileModal();
  };

  const handleOptionSelect = (option) => {
    closeModals();

    // Handle the selected option as needed
    if (option === "BinStatus") {
      handleNavigateToBinStatus();
    } else if (option === "BinLocation") {
      handleNavigateToBinLocation();
    } else if (option === "SanitaryWorkersInformation") {
      handleNavigateToSanitaryWorkersInformation();
    }
  };

  const openProfileModal = () => {
    // Set the state to display the profile modal and show the options
    setProfileModalVisible(true);
  };

  const openOptionsModal = () => {
    // Set the state to display the options modal and show the options
    setOptionsModalVisible(true);
  };

  const openChatWindow = () => {
    setChatWindowVisible(true);
  };

  const closeModal = () => {
    setProfileModalVisible(false);
    setOptionsModalVisible(false);
    setChatWindowVisible(false);
  };

  const closeModals = () => {
    closeModal();
  };

  const handleNameClick = (name) => {
    console.log(`Clicked ${name}`);
    setChatWindowVisible(true);
  };

  const windowWidth = Dimensions.get("window").width;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#333333", // Ash color background
      padding: 0,
      width: "100%",
    },
    headerLeft: {
      flex: 1,
      alignItems: "flex-start",
    },
    headerCenter: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      marginLeft: windowWidth < 600 ? -10 : 0, // Adjust the value as needed
      justifyContent: "center", // Center the content horizontally
    },
    headerRight: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-end",
      marginRight: windowWidth < 600 ? 10 : 20, // Adjust the margin on the right
    },
    headerButton: {
      marginLeft: 10,
    },
    logo: {
      width: 100,
      height: 100,
      marginRight: -20, // Add some margin between logo and text
    },
    headerTitle: {
      fontSize: RFPercentage(2.9),// Adjust the factor as needed
      fontWeight: "bold",
      color: "#008000", // Green color for text
      marginLeft: windowWidth < 600 ? 10 : 0, // Adjust the threshold (600) based on your design
      marginRight: windowWidth < 600 ? 10 : 0, // Adjust the threshold (600) based on your design
    },
    headerIcon: {
      marginLeft: 5,
    },
    body: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    bodyText: {
      fontSize: 45,
      fontWeight: "bold",
      marginBottom: 10,
    },
    availableBins: {
      fontSize: 80,
      fontWeight: "bold",
      color: "#4CAF50", // Green color for the number
      marginTop: 10,
    },
    modalView: {
      position: 'absolute',
      left: 15,
      top: "50%", // Adjust as needed
      transform: [{ translateY: -150 }],
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      padding: 15,
      backgroundColor: "white",
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalOption: {
      paddingVertical: 15,
      borderBottomWidth: 3,
      borderBottomColor: "#eee",
      width: "100%",
    },
    modalOptionText: {
      fontWeight: "bold",
      color: "#50C878", // Green color for text
      fontSize: 20, // Adjust the font size as needed
    },
    modalCloseButton: {
      position: "absolute",
      top: 10,
      right: 10,
      zIndex: 1,
    },
    forumModalView: {
      position: 'absolute',
      right: 0,
      top: "35%", // Adjust as needed
      transform: [{ translateY: -150 }],
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-end",
      padding: 15,
      backgroundColor: "white",
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    chatWindow: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      justifyContent: "right",
      alignItems: "left",
      backgroundColor: "rgba(0.9, 0, 0, 1)", // Semi-transparent black background
    },
    chatWindowContent: {
      padding: 20,
      backgroundColor: "#333", // White background for the chat window content
      borderRadius: 10,
    },
    chatWindowText: {
      fontSize: 20,
      color: "#333",
      marginBottom: 10,
    },
    chatWindowPeople: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    chatWindowNameText: {
      fontSize: 24,
      color: "#228B22", // Forest green color for the names
      marginBottom: 10,
    },
  });

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => openOptionsModal()}
          >
            <AntDesign name="bars" size={25} color="#4CAF50" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerCenter}>
          {/* Your Logo */}
          <Image
            source={require("../assets/logo.png")} // Update with the correct path to your logo
            style={styles.logo}
          />
          <Text style={styles.headerTitle}>GB Tech</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={openChatWindow}
          >
            <AntDesign name="message1" size={25} color="#4CAF50" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => openProfileModal()}
          >
            <FontAwesome name="user" size={25} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Body Section */}
      <View style={styles.body}>
        <Text style={styles.bodyText}>
          Currently available bins in the city:
        </Text>
        <Text style={styles.availableBins}>{availableBins}</Text>
      </View>

      {/* Profile Modal */}
      <Modal
        transparent={true}
        visible={profileModalVisible}
        onRequestClose={() => closeModal()}
      >
        <View style={styles.modalView}>
          <Pressable onPress={() => closeModal()} style={styles.modalCloseButton}>
            <AntDesign name="close" size={20} color="#4CAF50" />
          </Pressable>
          <View>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleProfileOption("ProfileDetails")}
            >
              <Text style={styles.modalOptionText}>Profile Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleProfileOption("Logout")}
            >
              <Text style={styles.modalOptionText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Options Modal */}
      <Modal
        transparent={true}
        visible={optionsModalVisible}
        onRequestClose={() => closeModal()}
      >
        <View style={styles.modalView}>
          <Pressable onPress={() => closeModal()} style={styles.modalCloseButton}>
            <AntDesign name="close" size={20} color="#4CAF50" />
          </Pressable>
          <View>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleOptionSelect("BinStatus")}
            >
              <Text style={styles.modalOptionText}>Bin Status</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleOptionSelect("BinLocation")}
            >
              <Text style={styles.modalOptionText}>Bin Location</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleOptionSelect("SanitaryWorkersInformation")}
            >
              <Text style={styles.modalOptionText}>
                Sanitary Workers Information
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Chat Window */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={chatWindowVisible}
        onRequestClose={() => closeModal()}
      >
        <View style={styles.chatWindow}>
          <Pressable onPress={() => closeModal()} style={styles.modalCloseButton}>
            <AntDesign name="close" size={20} color="#4CAF50" />
          </Pressable>
          <View style={styles.chatWindowContent}>
            <TouchableOpacity onPress={() => handleNameClick("John Doe")}>
              <Text style={styles.chatWindowNameText}>John Doe</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNameClick("Jane Austin")}>
              <Text style={styles.chatWindowNameText}>Jane Austin</Text>
            </TouchableOpacity>
            {/* Add more names as needed */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CollectorHomeScreen;