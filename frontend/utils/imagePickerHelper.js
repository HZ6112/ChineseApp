import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import uuid from "react-native-uuid";
import { Firebase_app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export const launchImagePicker = async (aspectRatio = [1, 1]) => {
  await checkMediaPermissons();
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: aspectRatio,
    quality: 1,
  });
  if (!result.canceled) {
    const fireAsset = result.assets[0];
    return fireAsset.uri;
  }
};
export const uploadImageAsync = async (uri) => {
  const app = Firebase_app;
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network reject fails"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send();
  });
  const pathFolder = "profilePics";
  const storageRef = ref(getStorage(app), `${pathFolder}/${uuid.v4()}`);
  await uploadBytesResumable(storageRef, blob);
  blob.close();
  return await getDownloadURL(storageRef);
};

const checkMediaPermissons = async () => {
  if (Platform.OS != "web") {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted == false) {
      return Promise.reject("We need permission to access your photos");
    }
  }
};
