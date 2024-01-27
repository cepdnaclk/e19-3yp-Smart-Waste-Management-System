import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
// Import useIsFocused from react-navigation/native
import { useIsFocused } from "@react-navigation/native";
import GarbageCollectorHomeScreen from "./CollectorHomeScreen";

const ProfileCollector = () => {
  const [collectorDetails, setCollectorDetails] = useState({});
  const [changePasswordModalVisible, setChangePasswordModalVisible] =
    useState(false);
  const [newPassword, setNewPassword] = useState("");
  const navigation = useNavigation();

  const isFocused = useIsFocused();

  // Reset changePasswordModalVisible when returning to GarbageCollectorHomeScreen
  useEffect(() => {
    if (isFocused) {
      setChangePasswordModalVisible(false); // Fix the state name here
    }
  }, [isFocused]);

  useFocusEffect(
    React.useCallback(() => {
      // Fetch collector details when the component gains focus
      fetchCollectorDetailsFromDatabase();
    }, [])
  );

  const fetchCollectorDetailsFromDatabase = async () => {
    try {
      console.log("Fetching collector details...");

      if (!isFocused) {
        console.log("Component is not focused. Skipping fetch.");
        return;
      }

      const response = await fetch(
        "http://localhost:1337/api/collector-details"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch collector details");
      }

      const data = await response.json();

      console.log("Collector details response:", response);
      console.log("Collector details data:", data);

      setCollectorDetails(data);
    } catch (error) {
      console.error("Error fetching collector details:", error.message);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const handleChangePassword = async () => {
    try {
      // Replace this with your actual API endpoint and logic to change the password
      const response = await fetch(
        "http://localhost:1337/api/collector-details/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to change password");
      }

      setChangePasswordModalVisible(false);
      Alert.alert(
        "Password Changed",
        "Your password has been changed successfully!"
      );
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
          <Text style={styles.detailText}>Name: {collectorDetails.name}</Text>
          <Text style={styles.detailText}>Email: {collectorDetails.email}</Text>
          <Text style={styles.detailText}>
            Status: {collectorDetails.status}
          </Text>
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
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleChangePassword}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setChangePasswordModalVisible(false)}
            >
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate(GarbageCollectorHomeScreen)}
        style={styles.backButton}
      >
        <AntDesign name="arrowleft" size={24} color="#4CAF50" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: "white", // White background color
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#4CAF50", // Green color
  },
  profileDetailsContainer: {
    marginBottom: 70,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 20,
    color: "#333", // Dark gray color
  },
  changePasswordButton: {
    fontSize: 18,
    color: "#006400",
    textDecorationLine: "underline",
    marginBottom: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#F5F5F5", // Light gray background color
    padding: 20,
    borderRadius: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4CAF50", // Green color
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: "#006400",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  confirmButton: {
    backgroundColor: "#4CAF50", // Green color
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
    color: "#006400",
    textDecorationLine: "underline",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
  },
});

export default ProfileCollector;
