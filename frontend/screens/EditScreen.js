import React, {useState} from "react";
import { View, StyleSheet, Text, Pressable, Keyboard } from "react-native";
import PostImagePicker from "../components/PostImagePicker"
import PostDescriptionInput from "../components/PostDescriptionInput";

import Screen from "../components/Screen";

function EditScreen(props) {
  Keyboard.dismiss();
  const [typing, setTyping] = useState(false);
  const updateTyping = (isTyping) => { setTyping(isTyping); };
  return (
    <Screen style={styles.container}>
      {
        !typing && <PostImagePicker style={styles.imagePicker}/>
      }
      <PostDescriptionInput style={styles.descriptionInput} updateTypingStatus={updateTyping}/>
      {
        typing && <View style={styles.imagePicker}></View>
      }
      
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  imagePicker: {
    flex: 2,
    backgroundColor: "powderblue"
  },
  descriptionInput: {
    flex: 1
  }
});

export default EditScreen;
