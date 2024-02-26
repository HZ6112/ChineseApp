import React, { useState, useEffect, useCallback } from "react";
import { ActivityIndicator, Alert, StyleSheet } from "react-native";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import colors from "../config/colors";

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import { Firebase_auth } from "../firebase";
import { Register } from "../utils/authAction";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen() {
  const dispatch = useDispatch();
  const auth = Firebase_auth;
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured", error, [{ text: "Okay" }]);
    }
  }, [error]);
  const handleSubmit = useCallback(
    async ({ name, email, password }) => {
      try {
        setIsLoading(true);
        const action = Register(name, email, password);
        await dispatch(action);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        {isLoading ? (
          <ActivityIndicator
            size={"small"}
            color={colors.primary}
            style={{ marginTop: 10 }}
          />
        ) : (
          <SubmitButton title="Register" />
        )}
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
