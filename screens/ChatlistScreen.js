import React, { useEffect, useMemo } from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { useSelector } from "react-redux";
import DataItem from "../components/DataItem";
import Screen from "../components/Screen";

const MessageScreen = (props) => {
  const selectedUser = props.route?.params?.selectedUserId;
  const storedUsers = useSelector((state) => state.users.storedUsers);
  const userData = useSelector((state) => state.auth.userData);
  const chatsData = useSelector((state) => state.chats.chatsData);
  const userChats = useMemo(() => {
    return Object.values(chatsData).sort((a, b) => {
      return new Date(b.updateAt) - new Date(a.updateAt);
    });
  }, [chatsData]);
  useEffect(() => {
    if (!selectedUser) {
      return;
    }
    let ChatAlreadyExists = userChats.find(
      (chats) =>
        chats.users.find((uid) => uid === selectedUser) &&
        chats.users.find((uid) => uid === userData.userId)
    );
    if (ChatAlreadyExists) {
      let chatId = ChatAlreadyExists.key;
      props.navigation.navigate("Chat", { chatId });
    } else {
      const chatUsers = [selectedUser, userData.userId];
      const navigationProps = {
        newChatData: { users: chatUsers },
      };
      props.navigation.navigate("Chat", navigationProps);
    }
  }, [props.route?.params]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="New chat"
              iconName="create-outline"
              onPress={() => {
                props.navigation.navigate("Modal");
              }}
            />
          </HeaderButtons>
        );
      },
    });
  }, []);

  return (
    <Screen>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          marginVertical: 10,
          marginHorizontal: 5,
        }}
      >
        Chats
      </Text>
      <FlatList
        data={userChats}
        renderItem={(itemData) => {
          const chatData = itemData.item;
          const chatId = chatData.key;
          const otherUserId = chatData.users.find(
            (uid) => uid !== userData.userId
          );
          const otherUser = storedUsers[otherUserId];
          if (!otherUser) return;
          return (
            <DataItem
              title={otherUser.name}
              subTitle={chatData.latestMessageText || "New Chat"}
              image={otherUser.profilePicture}
              onPress={() => props.navigation.navigate("Chat", { chatId })}
            />
          );
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MessageScreen;
