import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, Pressable, Dimensions } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RFPercentage } from "react-native-responsive-fontsize"; // Import RFPercentage


const GarbageCollectorHomeScreen = () => {
  const [availableBins, setAvailableBins] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [forumModalVisible, setForumModalVisible] = useState(false);
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

  const navigation = useNavigation();

  const handleProfileOption = (option) => {
    closeModals(); // Close the menu
  
    if (option === "ProfileDetails") {
      // Navigate to the "ProfileDetailsGarbageCollectors" screen
      navigation.navigate("ProfileGarbageCollectors");
    } else if (option === "Logout") {
      // Navigate to the "LoginScreen" screen
      navigation.navigate("LoginScreen");
    }
  
    // Open the profile modal
    openProfileModal();
  };
  
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  const openProfileModal = () => {
    setProfileModalVisible(true);
  };


  const openModal = () => {
    setModalVisible(true);
  };

  const closeModals = () => {
    setModalVisible(false);
    setForumModalVisible(false);
    setChatWindowVisible(false);
  };

  const openForumModal = () => {
    setForumModalVisible(true);
  };

  const openChatWindow = () => {
    setChatWindowVisible(true);
  };

  const closeModal = () => {
    closeModals();
  };

  const openProfileMenu = () => {
    setModalVisible(true);
  };

  const handleNameClick = (name) => {
    console.log(`Clicked ${name}`);
    // Add your logic to navigate to another page or perform other actions

    // Set chatWindowVisible to true to open the chat window
    setChatWindowVisible(true);
  };

  const windowWidth = Dimensions.get('window').width;

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
            onPress={openModal}
          >
            <AntDesign name="bars" size={25} color="#4CAF50" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerCenter}>
          {/* Your Logo */}
          <Image
            source={require('../assets/logo.png')}  // Update with the correct path to your logo
            style={styles.logo}
          />
          <Text style={styles.headerTitle}>GB Tech</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={openForumModal}
          >
            <FontAwesome name="comments" size={25} color="#4CAF50" />
          </TouchableOpacity>
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
      

        <Modal
          animationType="slide"
          transparent={true}
          visible={profileModalVisible}
          onRequestClose={() => setProfileModalVisible(false)}
        >
          <View style={styles.forumModalView}>
            <Pressable onPress={() => setProfileModalVisible(false)} style={styles.modalCloseButton}>
              <AntDesign name="close" size={20} color="#4CAF50" />
            </Pressable>
            <TouchableOpacity style={styles.modalOption} onPress={() => handleProfileOption("ProfileDetails")}>
              <Text style={styles.modalOptionText}>Profile Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={() => handleProfileOption("Logout")}>
              <Text style={styles.modalOptionText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        </View>

      {/* Body Section */}
      <View style={styles.body}>
        <Text style={styles.bodyText}>Currently available bins in the city:</Text>
        <Text style={styles.availableBins}>{availableBins}</Text>
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible || forumModalVisible || chatWindowVisible}
        onRequestClose={closeModal}
      >
        <View style={chatWindowVisible ? styles.chatWindow : (forumModalVisible ? styles.forumModalView : styles.modalView)}>
          <Pressable onPress={closeModal} style={styles.modalCloseButton}>
            <AntDesign name="close" size={20} color="#4CAF50" />
          </Pressable>
          {forumModalVisible ? (
            <View style={styles.forumModalContent}>
              <TouchableOpacity style={styles.modalOption} onPress={() => handleForumOption1()}>
                <Text style={styles.modalOptionText}>Forum Option 1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption} onPress={() => handleForumOption2()}>
                <Text style={styles.modalOptionText}>Forum Option 2</Text>
              </TouchableOpacity>
              {/* Add more forum options as needed */}
            </View>
          ) : (
            <View style={styles.optionModalContent}>
              <TouchableOpacity style={styles.modalOption} onPress={optimizedCollectionRoutes}>
                <Text style={styles.modalOptionText}>Bin Status</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption} onPress={unlockLockedBin}>
                <Text style={styles.modalOptionText}>Information of Sanitary Workers</Text>
              </TouchableOpacity>
              {/* Add more options as needed */}
            </View>
          )}
        </View>
      </Modal>
      {/* Chat Window */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={chatWindowVisible}
        onRequestClose={closeModal}
      >
         <View style={styles.chatWindow}>
              <Pressable onPress={closeModal} style={styles.modalCloseButton}>
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

export default GarbageCollectorHomeScreen;



  
