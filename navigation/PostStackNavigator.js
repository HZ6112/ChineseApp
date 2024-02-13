import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FeedScreen from "../screens/FeedScreen";
import DetailsScreen from "../screens/DetailsScreen"; // Ensure this is the correct path to your DetailsScreen

const PostStack = createStackNavigator();

function PostStackNavigator() {
  return (
    <PostStack.Navigator>
      <PostStack.Screen name="FeedScreen" component={FeedScreen} options={{ headerTitle: "FeedScreen" }} />
      <PostStack.Screen name="Details" component={DetailsScreen} options={{ headerTitle: "Details" }} />
    </PostStack.Navigator>
  );
}
export default PostStackNavigator;