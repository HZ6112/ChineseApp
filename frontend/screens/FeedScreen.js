import React from "react";
import { View, StyleSheet, Text } from "react-native";

import Screen from "../components/Screen";

function FeedScreen(props) {
  return (
    <Screen style={styles.container}>
      <Text>FeedScreen</Text>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default FeedScreen;
