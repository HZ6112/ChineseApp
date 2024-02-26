import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MessageNavigator from "./MessageNavigator";
import { useDispatch, useSelector } from "react-redux";
import { Firebase_app } from "../firebase";
import { child, getDatabase, onValue, ref, off } from "firebase/database";
import { setChatsData } from "../store/chatSlice";
const Stack = createStackNavigator();

const AccountNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="Message"
        component={MessageNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AccountNavigation;
