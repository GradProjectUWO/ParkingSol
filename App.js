import React from 'react';
import Login from './screens/Login';
import Signup from './screens/Signup';
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';

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
        <Stack.Screen  name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}