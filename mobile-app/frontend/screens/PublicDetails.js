import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from "@expo/vector-icons";

const PublicDetails = ({ navigation }) => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Fetch user details from AsyncStorage or any other data source
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            // Fetch user details from AsyncStorage
            const storedName = await AsyncStorage.getItem('name');
            const storedMobile = await AsyncStorage.getItem('mobile');
            const storedEmail = await AsyncStorage.getItem('email');

            // Set the state with the fetched user details
            setName(storedName || '');
            setMobile(storedMobile || '');
            setEmail(storedEmail || '');
        } catch (error) {
            console.error('Error fetching user details:', error.message);
        }
    };

    // const saveUserDetails = async () => {
    //     try {
    //         // Save updated user details to AsyncStorage
    //         await AsyncStorage.setItem('name', name);
    //         await AsyncStorage.setItem('mobile', mobile);
    //         await AsyncStorage.setItem('email', email);

    //         // Navigate back to the previous screen
    //         navigation.goBack();
    //     } catch (error) {
    //         console.error('Error saving user details:', error.message);
    //     }
    // };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => { navigation.navigate('PublicHomeScreen'); }} style={styles.icon} >
                <AntDesign name="left" size={30} color="green" />
            </TouchableOpacity>
            <Image
                style={styles.avatar}
                source={require("../assets/60111.jpg")}
            />
            <Text style={styles.heading}>Name</Text>
            <Text style={styles.body}>{name}</Text>
            <Text style={styles.heading}>Email</Text>
            <Text style={styles.body}>{email}</Text>
            <Text style={styles.heading}>Contact Number</Text>
            <Text style={styles.body}>{mobile}</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    icon: {
        alignSelf: 'flex-start',
        paddingLeft: 10,
        paddingTop: 20
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
    },
    avatar: {
        marginTop: 50,
        marginBottom:50,
        width: 150,
        height: 150,
        borderRadius: 100,
        borderColor: '#105716',
        borderWidth:3
    },
    heading: {
        fontSize: 25,
        color: 'green',
        fontWeight:'bold'
    },
    body: {
        fontSize: 18,
        marginBottom:30
    },
});

export default PublicDetails;
