import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Icon from "../components/Icon";
import Text from "../components/Text";
import { Firebase_auth } from "../firebase";
import Screen from "../components/Screen";
import Button from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../utils/authAction";
import ListItem from "../components/listItem";
import colors from "../config/colors";

function AccountScreen({ navigation }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const defaultImage = require("../assets/userImage.jpg");
  const image = userData.profilePicture || defaultImage;

  return (
    <Screen style={styles.container}>
      <ListItem
        title={userData.name}
        subTitle={userData.email}
        image={image}
        onPress={() => navigation.navigate("Profile")}
      />
      <View style={styles.textContainer}>
        <Text>About: {userData.about}</Text>
      </View>
      <View style={{ paddingVertical: 20 }}>
        <ListItem
          title="Message"
          IconComponent={<Icon name="email" backgroundColor={colors.primary} />}
          onPress={() => navigation.navigate("Message")}
        />
        <ListItem
          title="Posts"
          IconComponent={
            <Icon
              name="format-list-bulleted"
              backgroundColor={colors.primary}
            />
          }
          onPress={() => console.log("pressed")}
        />
      </View>
      <View style={{ paddingTop: 20 }}>
        <Button title="Log out" onPress={() => dispatch(userLogout())} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  textContainer: {
    padding: 10,
    backgroundColor: colors.white,
  },
});

export default AccountScreen;
