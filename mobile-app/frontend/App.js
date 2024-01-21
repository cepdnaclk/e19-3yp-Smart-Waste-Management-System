import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreenCollector from './screens/LoginScreenCollector';
import LoginScreenPublic from './screens/LoginScreenPublic';
import RegisterScreen from './screens/RegisterScreen';
import CollectorHomeScreen from './screens/CollectorHomeScreen';
import PublicHomeScreen from './screens/PublicHomeScreen';
import ProfileCollector from './screens/ProfileCollector';
import ReportScreen from './screens/ReportScreen';
import BinMap from './screens/BinMap';
import LoginScreen from './screens/LoginScreen';


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
          name="CollectorHomeScreen"
          component={CollectorHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PublicHomeScreen"
          component={PublicHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileCollector"
          component={ProfileCollector}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


