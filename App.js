// App.js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import Login from './screens/Login';
import HomeScreen from './screens/HomeScreen';
import OrderScreen from './screens/OrderScreen';


import ProfileScreen from './screens/Profile';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="SignIn" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="OrderScreen" component={OrderScreen} options={{headerShown:false}}/>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown:false}}/>
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
