import React from "react";
import { View, StyleSheet } from "react-native";
import { Firebase_app } from "../firebase";
import { ref, getDatabase, push, child, update } from "firebase/database";

export const createChat = async (loggedInUserId, chatData) => {
  const newChatData = {
    ...chatData,
    createdBy: loggedInUserId,
    updatedBy: loggedInUserId,
    createdAt: new Date().toISOString(),
    updateAt: new Date().toISOString(),
  };
  const app = Firebase_app;
  const dbRef = ref(getDatabase(app));
  const newChat = await push(child(dbRef, `chats`), newChatData);

  const chatUsers = newChatData.users;
  for (let i = 0; i < chatUsers.length; i++) {
    const userId = chatUsers[i];
    await push(child(dbRef, `userChats/${userId}`), newChat.key);
  }
  return newChat.key;
};

export const sendTextMessage = async (chatId, senderId, messageText) => {
  const app = Firebase_app;
  const dbRef = ref(getDatabase(app));
  const messageRef = child(dbRef, `messages/${chatId}`);
  const messageData = {
    sendBy: senderId,
    sendAt: new Date().toISOString(),
    text: messageText,
  };
  await push(messageRef, messageData);
  const chatRef = child(dbRef, `chats/${chatId}`);
  await update(chatRef, {
    updatedBy: senderId,
    updateAt: new Date().toISOString(),
    latestMessageText: messageText,
  });
};
