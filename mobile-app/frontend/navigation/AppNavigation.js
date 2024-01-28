import React, { useContext } from 'react'
import LoginScreen from '../screens/LoginScreen'
import LoginScreenPublic from '../screens/LoginScreenPublic'
import LoginScreenCollector from '../screens/LoginScreenCollector'
import PublicHomeScreen from '../screens/PublicHomeScreen'
import CollectorHomeScreen from '../screens/CollectorHomeScreen'
import RegisterScreen from '../screens/RegisterScreen'
import ReportScreen from '../screens/ReportScreen'
import BinMap from '../screens/BinMap'
import Aws from '../screens/Aws'
import Notification from '../screens/Notification'
import PublicDetails from '../screens/PublicDetails'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { AuthContext } from '../context/AuthContext'
import { ActivityIndicator, Text, View } from 'react-native'

const Stack = createNativeStackNavigator();


const AppNavigation = () => {

  const { isLoading, publicUserToken, collectorUserToken } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={[{ flex: 1 }, { justifyContent: 'center' }, { alignItems: 'center' }]}>
          <ActivityIndicator size='large' />
      </View>
    ) 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {(publicUserToken === null && collectorUserToken === null) ? (
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : (publicUserToken === null && collectorUserToken !== null) ? (
          <Stack.Screen
            name="CollectorHomeScreen"
            component={CollectorHomeScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="PublicHomeScreen"
            component={PublicHomeScreen}
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen
          name="LoginScreenPublic"
          component={LoginScreenPublic}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreenCollector"
          component={LoginScreenCollector}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ReportScreen"
          component={ReportScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BinMap"
          component={BinMap}
          options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Aws"
            component={Aws}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="LoginScreen1"
            component={LoginScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="PublicHomeScreen1"
            component={PublicHomeScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CollectorHomeScreen1"
          component={CollectorHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PublicDetails"
          component={PublicDetails}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  )
}

export default AppNavigation