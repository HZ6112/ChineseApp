import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { User, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthNavigator from "./navigation/AuthNavigation";
import ActivityIndicator from "./components/ActivityIndicator";
import AppNavigator from "./navigation/AppNavigation";

import { Firebase_auth } from "./firebase";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Check for the token when the component mounts
    const checkUserLoggedIn = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      if (userToken) {
        // The user is logged in
        setUser(userToken);
        setLoading(false); // Set an empty object or user data if you have it
      } else {
        // The user is not logged in
        setUser(null);
        setLoading(false);
      }
    };

    checkUserLoggedIn();

    // Set up the onAuthStateChanged listener
    const unsubscribe = onAuthStateChanged(
      Firebase_auth,
      async (firebaseUser) => {
        if (firebaseUser) {
          // User is signed in, save the token in AsyncStorage
          await AsyncStorage.setItem("userToken", firebaseUser.uid); // or some token
          setUser(firebaseUser);
        } else {
          // User is signed out, remove the token from AsyncStorage
          await AsyncStorage.removeItem("userToken");
          setUser(null);
        }
        if (loading) {
          setLoading(false); // Set loading to false after receiving auth state
        }
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [loading]);

  if (loading) {
    return <Image source={require("./assets/splash.png")} />;
  }

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
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
