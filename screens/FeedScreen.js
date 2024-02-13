import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

import Card from "../components/Card";
import colors from "../config/colors";
import Screen from "../components/Screen";


const listings = [
  {
    id: 1,
    title: "Red jacket for sale",
    price: 100,
    image: require("../assets/icon.png"),
  },
  {
    id: 2,
    title: "Couch in great condition",
    price: 1000,
    image: require("../assets/icon.png"),
  },
];

function FeedScreen(props) {
  const navigation = useNavigation();
  return (
    <Screen style={styles.screen}>
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={"$" + item.price}
            image={item.image}
            onPress={() => navigation.navigate('Details', { item: item })}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default FeedScreen;
