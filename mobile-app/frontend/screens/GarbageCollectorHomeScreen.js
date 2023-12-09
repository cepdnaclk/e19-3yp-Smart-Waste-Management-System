import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, Pressable } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

const GarbageCollectorHomeScreen = ({ navigation }) => {
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

  const optimizedCollectionRoutes = () => {
    // Implement optimized collection routes logic here
    closeModals();
  };

  const unlockLockedBin = () => {
    // Implement unlock locked bin logic here
    closeModals();
  };

  const checkBinFilledLevel = () => {
    // Implement check bin filled level logic here
    closeModals();
  };

  const checkTemperatureLevel = () => {
    // Implement check temperature level logic here
    closeModals();
  };

  const reportIssues = () => {
    // Implement report issues logic here
    closeModals();
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

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={openModal}
          >
            <AntDesign name="bars" size={30} color="#4CAF50" />
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
            <FontAwesome name="comments" size={30} color="#4CAF50" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={openChatWindow}
          >
            <AntDesign name="message1" size={30} color="#4CAF50" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => {
              // Handle profile button click
            }}
          >
            <FontAwesome name="user" size={30} color="#4CAF50" />
          </TouchableOpacity>
        </View>
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
            <AntDesign name="close" size={30} color="#4CAF50" />
          </Pressable>
          {chatWindowVisible && (
            <View >
              {/* Your chat window content goes here */}
            </View>
          )}
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
            <AntDesign name="close" size={30} color="#4CAF50" />
          </Pressable>
          <View style={styles.chatWindowContent}>
            <View style={styles.chatWindowPeople}>
              {/* Render people names dynamically */}
              <Text style={styles.chatWindowNameText}>John Doe</Text>
              <Text style={styles.chatWindowNameText}>Jane Austin</Text>
              {/* Add more names as needed */}
            </View>
            {/* Your chat window content goes here */}
          </View>
        </View>
      </Modal>
    </View>
  );
};
  

export default GarbageCollectorHomeScreen;

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
    padding: 10,
    width: "100%",
  },
  headerLeft: {
    flex: 1,
    alignItems: "flex-start",
  },
  headerCenter: {
    flex: 1,
    flexDirection: "row", // To align logo and text horizontally
    alignItems: "center",
  },
  headerRight: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  headerButton: {
    marginLeft: 10,
  },
  logo: {
    width: 180,
    height: 180,
    marginRight: 0, // Add some margin between logo and text
  },
  headerTitle: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#4CAF50", // Green color for text
  },
  headerIcon: {
    marginLeft: 10,
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
    fontFamily: "Arial",
  },
  modalView: {
    position: 'absolute',
    left: 15,
    top: "35%", // Adjust as needed
    transform: [{ translateY: "-50%" }], // Center the modal vertically
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
  forumModalView: {
    position: 'absolute',
    right: 0,
    top: "35%", // Adjust as needed
    transform: [{ translateY: "-50%" }],
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
    fontFamily: "YourDesignFont", // Replace with your custom font family
    marginBottom: 10,
  },
});
