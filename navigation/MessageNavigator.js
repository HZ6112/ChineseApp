import React, { useEffect, useState } from "react";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { ActivityIndicator, View } from "react-native";
import ChatScreen from "../screens/ChatScreen";
import ChatlistScreen from "../screens/ChatlistScreen";
import NewChatScreen from "../screens/NewChatScreen";
import { useDispatch, useSelector } from "react-redux";
import { Firebase_app } from "../firebase";
import { child, getDatabase, onValue, ref, off, get } from "firebase/database";
import { setChatsData } from "../store/chatSlice";
import colors from "../config/colors";
import { setStoredUsers } from "../store/userSlice";
import { setChatMessages } from "../store/messageSlice";

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

const MessageNavigator = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);
  const storedUsers = useSelector((state) => state.users.storedUsers);
  useEffect(() => {
    console.log("Subcribing to firebase listeners");
    const app = Firebase_app;
    const dbRef = ref(getDatabase(app));
    const userChatsRef = child(dbRef, `userChats/${userData.userId}`);
    const refs = [userChatsRef];
    onValue(userChatsRef, (querySnapshot) => {
      const chatIdsData = querySnapshot.val() || {};
      const chatIds = Object.values(chatIdsData);
      const chatsData = {};
      let chatsFoundCount = 0;
      for (let i = 0; i < chatIds.length; i++) {
        const chatId = chatIds[i];
        const chatsRef = child(dbRef, `chats/${chatId}`);
        refs.push(chatsRef);

        onValue(chatsRef, (chatSnapshot) => {
          chatsFoundCount++;
          const data = chatSnapshot.val();
          if (data) {
            data.key = chatSnapshot.key;
            data.users.forEach((userId) => {
              if (storedUsers[userId]) return;
              const userRef = child(dbRef, `users/${userId}`);
              get(userRef).then((userSnapshot) => {
                const userSnapshotData = userSnapshot.val();
                dispatch(setStoredUsers({ newUsers: { userSnapshotData } }));
              });
              refs.push(userRef);
            });
            chatsData[chatSnapshot.key] = data;
          }
          if (chatsFoundCount >= chatIds.length) {
            dispatch(setChatsData({ chatsData }));
            setIsLoading(false);
          }
        });
        const messageRef = child(dbRef, `messages/${chatId}`);
        refs.push(messageRef);
        onValue(messageRef, (messagesSnapshot) => {
          const messagesData = messagesSnapshot.val();
          dispatch(setChatMessages({ chatId, messagesData }));
        });
        if (chatsFoundCount === 0) {
          setIsLoading(false);
        }
      }
    });

    return () => {
      console.log("Unsubscribing to firebase listeners");
      refs.forEach((ref) => off(ref));
    };
  }, []);

  if (isLoading) {
    <View>
      <ActivityIndicator size={"large"} color={colors.primary} />
    </View>;
  }
  return (
    <Stack.Navigator
      screenOptions={{ presentation: "modal", headerShown: false }}
    >
      <Stack.Screen name="Chat List" component={MainStackNavigator} />
      <Stack.Screen name="Modal" component={ModalStackNavigator} />
    </Stack.Navigator>
  );
};

export default MessageNavigator;
