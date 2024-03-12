import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import ProfileImage from "./ProfileImage";
import colors from "../config/colors";

const DataItem = (props) => {
  const { title, subTitle, image } = props;
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.container}>
        <ProfileImage uri={image} size={40} />
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          <Text numberOfLines={1} style={styles.subTitle}>
            {subTitle}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomColor: colors.extraLightGrey,
    borderBottomWidth: 2,
    alignItems: "center",
    minHeight: 50,
    marginLeft: 10,
  },
  textContainer: {
    marginLeft: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.3,
  },
  subTitle: {
    color: colors.grey,
    letterSpacing: 0.3,
  },
});

export default DataItem;
