import React from "react";
import { View, StyleSheet, Text } from "react-native";
import PostImagePicker from "../components/PostImagePicker"

import Screen from "../components/Screen";

function EditScreen(props) {
  return (
    <Screen style={styles.container}>
      <Text>EditScreen</Text>
      <PostImagePicker/>
      <Text style={styles.test}></Text>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  test: {
    flex: 1
  }
});

export default EditScreen;
