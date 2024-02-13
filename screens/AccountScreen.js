import React from "react";
import { View, StyleSheet, FlatList} from "react-native";

import {signOut} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Firebase_auth } from "../firebase";

import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import Screen from "../components/Screen";
import Button from "../components/Button";

const menuItems = [
  {
    title: "Setting",
    icon: {
      name: "account-settings",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "Starred",
    icon: {
      name: "star",
      backgroundColor: colors.secondary,
    },
  },
  {
    title: "Your Posts",
    icon: {
      name: "email",
      backgroundColor: colors.primary,
    },
  },
];

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
   <Screen style={styles.screen}>
          <ListItem
            title={Firebase_auth.currentUser.email}
            image={require("../assets/icon.png")}
          />
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
            />
          )}
        />
        <Button title="Log out" onPress={Logout} />
    </Screen>
  );
}
const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    marginVertical: 20,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
