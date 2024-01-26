import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [publicUserToken, setPublicUserToken] = useState(null);

    const login = async (token) => {
        setIsLoading(true);
        setPublicUserToken(token);
        await AsyncStorage.setItem('publicUserToken', token);

        try {
            const publicUserToken = await AsyncStorage.getItem('publicUserToken');
            console.log('Public User Token (login):', publicUserToken);
        } catch (error) {
            console.error('Error retrieving Public User Token:', error);
        }
        setIsLoading(false);
    };

    const  logout = async () => {
        setIsLoading(true);
        console.log('Public User Token (logout):' + await AsyncStorage.getItem('publicUserToken'));
        await AsyncStorage.removeItem('publicUserToken');
        console.log('Public User Token (logout):' + await AsyncStorage.getItem('publicUserToken'));
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