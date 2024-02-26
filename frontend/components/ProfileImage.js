import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import userImage from "../assets/userImage.jpg";
import colors from "../config/colors";
import {
  launchImagePicker,
  uploadImageAsync,
} from "../utils/imagePickerHelper";
import { updateSignedInUserData } from "../utils/authAction";
import { updateLoggedInUserData } from "../store/authSlice";
import { FontAwesome } from "@expo/vector-icons";

const ProfileImage = (props) => {
  const dispatch = useDispatch();
  const source = props.uri ? { uri: props.uri } : userImage;
  const [image, setImage] = useState(source);
  const [isLoading, setIsLoading] = useState(false);
  const userId = props.userId;
  const pickImage = async () => {
    try {
      const tempUri = await launchImagePicker();
      if (!tempUri) return;
      setIsLoading(true);
      const uploadUrl = await uploadImageAsync(tempUri);
      setIsLoading(false);
      if (!uploadUrl) {
        throw new Error("could not upload image");
      }
      const newData = { profilePicture: uploadUrl };
      await updateSignedInUserData(userId, { profilePicture: uploadUrl });
      dispatch(updateLoggedInUserData({ newData }));
      setImage({ uri: uploadUrl });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <TouchableOpacity onPress={pickImage}>
      {isLoading ? (
        <View
          height={props.size}
          width={props.size}
          style={styles.loadingContainer}
        >
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      ) : (
        <Image
          style={{
            ...styles.image,
            ...{ width: props.size, height: props.size },
          }}
          source={image}
        />
      )}
      <View style={styles.editIconContainer}>
        <FontAwesome name="pencil" size={props.fontSize || 15} color="black" />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  image: {
    borderRadius: 50,
  },
  editIconContainer: {
    position: "absolute",
    bottom: -8,
    right: -8,
    backgroundColor: colors.lightGrey,
    borderRadius: 20,
    padding: 8,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileImage;
