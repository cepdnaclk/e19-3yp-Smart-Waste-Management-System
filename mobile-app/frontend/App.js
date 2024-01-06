import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import common from './screens/common';
import GarbageCollectorHomeScreen from './screens/GarbageCollectorHomeScreen';
import HouseOwnerHomeScreen from './screens/HouseOwnerHomeScreen';
import ProfileGarbageCollectors from './screens/ProfileGarbageCollectors';
import ReportScreen from './screens/ReportScreen';


const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="common"
          component={common}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GarbageCollectorHomeScreen"
          component={GarbageCollectorHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HouseOwnerHomeScreen"
          component={HouseOwnerHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileGarbageCollectors"
          component={ProfileGarbageCollectors}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ReportScreen"
          component={ReportScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


