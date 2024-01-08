import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreenGarbageCollector from './screens/LoginScreenGarbageCollector';
import LoginScreenPublic from './screens/LoginScreenPublic';
import RegisterScreen from './screens/RegisterScreen';
import GarbageCollectorHomeScreen from './screens/GarbageCollectorHomeScreen';
import PublicHomeScreen from './screens/PublicHomeScreen';
import ProfileGarbageCollectors from './screens/ProfileGarbageCollectors';
import ReportScreen from './screens/ReportScreen';
import BinMap from './screens/BinMap';



const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreenPublic"
          component={LoginScreenPublic}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreenGarbageCollector"
          component={LoginScreenGarbageCollector}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GarbageCollectorHomeScreen"
          component={GarbageCollectorHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PublicHomeScreen"
          component={PublicHomeScreen}
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


