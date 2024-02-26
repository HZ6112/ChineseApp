import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MessageNavigator from "./MessageNavigator";
const Stack = createStackNavigator();

const AccountNavigation = () => (
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

export default AccountNavigation;
