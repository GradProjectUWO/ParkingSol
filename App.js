import React from 'react';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Mainpage from './screens/Mainpage';
import Booking from './screens/Booking';
import Mapping from './screens/Mapping';
import Profile from './screens/Profile';

import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import BookSlot from "./screens/BookSlot";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen  name="Login" component={Login} options={{...TransitionPresets.DefaultTransition }}/>
        <Stack.Screen  name="Signup" component={Signup} options={{...TransitionPresets.DefaultTransition }}/>
        <Stack.Screen  name="Mainpage" component={Mainpage} options={{...TransitionPresets.DefaultTransition }}/>
        <Stack.Screen  name="Booking" component={Booking} options={{...TransitionPresets.DefaultTransition }}/>
        <Stack.Screen  name="Mapping" component={Mapping} options={{...TransitionPresets.DefaultTransition }}/>
        <Stack.Screen  name="Profile" component={Profile} options={{...TransitionPresets.DefaultTransition }}/>
          <Stack.Screen  name="BookSlot" component={BookSlot} options={{...TransitionPresets.DefaultTransition }}/>


      </Stack.Navigator>
    </NavigationContainer>
  );
}