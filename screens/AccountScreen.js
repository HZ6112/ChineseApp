import React from "react";
import { View, StyleSheet, Text } from "react-native";
import {signOut} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Firebase_auth } from "../firebase";
import Screen from "../components/Screen";
import Button from "../components/Button";

function AccountScreen(props) {
  const Logout = async() => {
    try {
        await signOut(Firebase_auth);
        await AsyncStorage.removeItem('userToken'); 
      } catch (error) {
        console.error('Error signing out: ', error);
      }
  }
  return (
    <Screen style={styles.container}>
      <Text>AccountScreen</Text>
      <Button title="Log out" onPress={Logout} />
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default AccountScreen;
