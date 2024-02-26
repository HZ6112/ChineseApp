import React, { useState, useCallback } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import ActivityIndicator from "../components/ActivityIndicator";

import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Form, FormField, SubmitButton } from "../components/forms";
import { updateLoggedInUserData } from "../store/authSlice";
import colors from "../config/colors";
import { updateSignedInUserData } from "../utils/authAction";
import ProfileImage from "../components/ProfileImage";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  about: Yup.string().label("About"),
});

function ProfileScreen(props) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const Iname = userData.name || "";
  const Iemail = userData.email || "";
  const Iabout = userData.about || "";

  handleSubmit = useCallback(
    async ({ name, email, about }) => {
      try {
        setIsLoading(true);
        const newData = { name, email, about };
        await updateSignedInUserData(userData.userId, newData);
        dispatch(updateLoggedInUserData({ newData }));
        setIsLoading(false);
        setShowSuccessMessage(true);

        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <ProfileImage
          size={100}
          fontSize={20}
          userId={userData.userId}
          uri={userData.profilePicture}
          showEditButton={true}
        />
        <Form
          initialValues={{ name: Iname, email: Iemail, about: Iabout }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormField
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder={Iname}
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder={Iemail}
            textContentType="emailAddress"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="about"
            placeholder={Iabout || "About"}
          />
          {isLoading ? (
            <ActivityIndicator
              size={"small"}
              color={colors.primary}
              style={{ marginTop: 10 }}
            />
          ) : (
            <SubmitButton title="Save" />
          )}
          {showSuccessMessage && <Text>Success</Text>}
        </Form>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    alignItems: "center",
    paddingTop: 20,
  },
});

export default ProfileScreen;
