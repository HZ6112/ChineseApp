import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import * as Yup from "yup";
import { ref, set, child, getDatabase } from "firebase/database";

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import { Firebase_auth } from "../firebase";
import { ErrorMessage } from "../components/forms";
import { createUserWithEmailAndPassword } from "firebase/auth";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});
const createUser = async (name, email, userId) => {
  const userData = {
    name,
    email,
    userId,
    signUpDate: new Date().toISOString(),
  };
  const dbRef = ref(getDatabase());
  const childRef = child(dbRef, `users/${userId}`);
  await set(childRef, userData);
  return userData;
};

function RegisterScreen() {
  const auth = Firebase_auth;
  const [error, setError] = useState();

  const handleSubmit = async ({ name, email, password }) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { uid } = response.user;
      const user = await createUser(name, email, uid);
      console.log(user);
    } catch (error) {
      console.log(error);
      Alert.alert(error.code);
      setError(error.code);
    }
    resetForm();
  };

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
        <SubmitButton title="Register" />
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
