import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { User, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthNavigator from "./navigation/AuthNavigation";
import AppNavigator from "./navigation/AppNavigation";

import { Firebase_auth } from "./firebase";


export default function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Check for the token when the component mounts
    const checkUserLoggedIn = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        // The user is logged in
        setUser(userToken); // Set an empty object or user data if you have it
      } else {
        // The user is not logged in
        setUser(null);
      }
    };
  
    checkUserLoggedIn();
  
    // Set up the onAuthStateChanged listener
    const unsubscribe = onAuthStateChanged(Firebase_auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, save the token in AsyncStorage
        await AsyncStorage.setItem('userToken', firebaseUser.uid); // or some token
        setUser(firebaseUser);
      } else {
        // User is signed out, remove the token from AsyncStorage
        await AsyncStorage.removeItem('userToken');
        setUser(null);
      }
    });
  
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

    <NavigationContainer>
        {user ? (
          <AppNavigator />
        ) : (
          <AuthNavigator />
        )}
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
