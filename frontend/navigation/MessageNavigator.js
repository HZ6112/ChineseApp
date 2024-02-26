import React from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import ChatScreen from "../screens/ChatScreen";
import ChatlistScreen from "../screens/ChatlistScreen";
import NewChatScreen from "../screens/NewChatScreen";

const Stack = createStackNavigator();
const MainStack = createStackNavigator();
const ModalStack = createStackNavigator();

const MainStackNavigator = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="ChatList" component={ChatlistScreen} />
    <MainStack.Screen name="Chat" component={ChatScreen} />
  </MainStack.Navigator>
);

const ModalStackNavigator = () => (
  <ModalStack.Navigator
    mode="modal"
    screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
    }}
  >
    <ModalStack.Screen name="New Chat" component={NewChatScreen} />
  </ModalStack.Navigator>
);

const MessageNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Message" component={MainStackNavigator} />
    <Stack.Screen name="Modal" component={ModalStackNavigator} />
  </Stack.Navigator>
);

export default MessageNavigator;
