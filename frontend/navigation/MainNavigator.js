import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import AppNavigator from "./AppNavigation";
import AuthNavigator from "./AuthNavigation";
import { useSelector } from "react-redux";
import StartUpScreen from "../screens/StartUpScreen";

const MainNavigator = (props) => {
  const isAuth = useSelector(
    (state) => state.auth.token != null && state.auth.token != ""
  );
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);
  return (
    <NavigationContainer>
      {isAuth && <AppNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartUpScreen />}
    </NavigationContainer>
  );
};
export default MainNavigator;
