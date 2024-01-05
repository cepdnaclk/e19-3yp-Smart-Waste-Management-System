import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect

const ProfileGarbageCollector = () => {
    const [collectorDetails, setCollectorDetails] = useState({});
    const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const navigation = useNavigation();
  
    // Fetch collector details when the component mounts
    useEffect(() => {
      // Mock API call to fetch collector details based on the logged-in user's information
      // Replace this with your actual API call to MongoDB
      fetchCollectorDetailsFromDatabase();
    }, []);
  
    const fetchCollectorDetailsFromDatabase = async () => {
      try {
        // Replace this with your actual API endpoint to fetch collector details
        const response = await fetch("http://localhost:1337/api/collector-details");
  
        if (!response.ok) {
          throw new Error("Failed to fetch collector details");
        }
  
        const data = await response.json();
  
        // Assuming the data contains the details of the logged-in collector
        setCollectorDetails(data);
      } catch (error) {
        console.error("Error fetching collector details:", error.message);
        // Handle the error (e.g., show an error message to the user)
      }
    };
  

  const handleChangePassword = async () => {
    try {
      // Replace this with your actual API endpoint and logic to change the password
      const response = await fetch("http://localhost:1337/api/collector-details/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      });

      if (!response.ok) {
        throw new Error("Failed to change password");
      }

      setChangePasswordModalVisible(false);
      Alert.alert("Password Changed", "Your password has been changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error.message);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Garbage Collector Profile</Text>

      {Object.keys(collectorDetails).length > 0 ? (
        <View style={styles.profileDetailsContainer}>
          <Text>Name: {collectorDetails.name}</Text>
          <Text>Email: {collectorDetails.email}</Text>
          <Text>Status: {collectorDetails.status}</Text>
        </View>
      ) : (
        <Text>Loading collector details...</Text>
      )}

      <TouchableOpacity onPress={() => setChangePasswordModalVisible(true)}>
        <Text style={styles.changePasswordButton}>Change Password</Text>
      </TouchableOpacity>


      {/* Change Password Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={changePasswordModalVisible}
        onRequestClose={() => setChangePasswordModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Password</Text>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter new password"
              secureTextEntry
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
            />
            <TouchableOpacity style={styles.confirmButton} onPress={handleChangePassword}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setChangePasswordModalVisible(false)}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileDetailsContainer: {
    marginBottom: 20,
  },
  changePasswordButton: {
    color: "blue",
    textDecorationLine: "underline",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  confirmButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelButton: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default ProfileGarbageCollector;
