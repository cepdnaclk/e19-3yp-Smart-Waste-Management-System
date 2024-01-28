import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [publicUserToken, setPublicUserToken] = useState(null);
    const [collectorUserToken, setCollectorUserToken] = useState(null);


    const loginPublic = async (token, name, email, mobile) => {
        setIsLoading(true);
        setPublicUserToken(token);

        await AsyncStorage.setItem('publicUserToken', token);
        await AsyncStorage.setItem('name', name);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('mobile', mobile);

        setIsLoading(false);
    };

    const loginCollector = async (token, name, email) => {
        setIsLoading(true);
        setCollectorUserToken(token);

        await AsyncStorage.setItem('collectorUserToken', token);
        await AsyncStorage.setItem('name', name);
        await AsyncStorage.setItem('email', email);

        setIsLoading(false);
    };

    const  logoutPublic = async () => {
        setIsLoading(true);

        await AsyncStorage.removeItem('publicUserToken');
        await AsyncStorage.removeItem('name');
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('mobile');
        
        setIsLoading(false);
    };

    const  logoutCollector = async () => {
        setIsLoading(true);

        await AsyncStorage.removeItem('collectorUserToken');
        await AsyncStorage.removeItem('name');
        await AsyncStorage.removeItem('email');
        
        setIsLoading(false);
    };

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let publicUserToken = await AsyncStorage.getItem('publicUserToken');
            let collectorUserToken = await AsyncStorage.getItem('collectorUserToken');

            //console.log('Public User Token (isLoggedIn):', publicUserToken);
            
            if (publicUserToken) {
                setPublicUserToken(publicUserToken);
            }

            if (collectorUserToken) {
                setCollectorUserToken(collectorUserToken);
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
        <AuthContext.Provider value={{isLoading, publicUserToken, collectorUserToken, loginPublic, loginCollector, logoutPublic, logoutCollector }}>
            {children}
        </AuthContext.Provider>
    );
    
}