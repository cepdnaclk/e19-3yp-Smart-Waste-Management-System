import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [publicUserToken, setPublicUserToken] = useState(null);
    // const [userName, setUserName] = useState(null);
    // const [userEmail, setEmail] = useState(null);

    const login = async (token, name, email) => {
        setIsLoading(true);
        setPublicUserToken(token);
        // setUserName(name);
        // setEmail(email);

        console.log(await AsyncStorage.getItem('publicUserToken'));
        console.log(await AsyncStorage.getItem('name'));
        console.log(await AsyncStorage.getItem('email'));

        await AsyncStorage.setItem('publicUserToken', token);
        await AsyncStorage.setItem('name', name);
        await AsyncStorage.setItem('email', email);

        // console.log(await AsyncStorage.getItem('publicUserToken'));
        // console.log(await AsyncStorage.getItem('name'));
        // console.log(await AsyncStorage.getItem('email'));


        // try {
        //     const publicUserToken = await AsyncStorage.getItem('publicUserToken');
        //     console.log('Public User Token (login):', publicUserToken);
        // } catch (error) {
        //     console.error('Error retrieving Public User Token:', error);
        // }
        setIsLoading(false);
    };

    const  logout = async () => {
        setIsLoading(true);
        //console.log('Public User Token (logout):' + await AsyncStorage.getItem('publicUserToken'));
        await AsyncStorage.removeItem('publicUserToken');
        await AsyncStorage.removeItem('name');
        await AsyncStorage.removeItem('email');
        //console.log('Public User Token (logout):' + await AsyncStorage.getItem('publicUserToken'));
        // console.log(await AsyncStorage.getItem('publicUserToken'));
        // console.log(await AsyncStorage.getItem('name'));
        // console.log(await AsyncStorage.getItem('email'));
        setIsLoading(false);
    };

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let publicUserToken = await AsyncStorage.getItem('publicUserToken');

            console.log('Public User Token (isLoggedIn):', publicUserToken);
            
            if (publicUserToken) {
                setPublicUserToken(publicUserToken);
            }

            setIsLoading(false);
        }
        catch (error) {
            console.log('isLoggedIn error', error);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

        

    return (
        <AuthContext.Provider value={{isLoading, publicUserToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
    
}