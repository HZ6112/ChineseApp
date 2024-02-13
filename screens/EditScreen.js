import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput} from "react-native";
import {Picker} from '@react-native-picker/picker';
import colors from "../config/colors";
import defaultStyles from "../config/styles";

import Screen from "../components/Screen";
import Button from "../components/Button";

function EditScreen(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [publishType, setPublishType] = useState('page');

  const handlePublish = () => {
    // Here you would handle the publish action, e.g., sending data to a server
    console.log({ title, description, publishType });
  };

  return (
    <Screen style={styles.container}>
      <Text style={[styles.label, defaultStyles.text]}>Title</Text>
      <TextInput
        style={[styles.input, defaultStyles.text]}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
      />
      <Text style={[styles.label, defaultStyles.text]}>Description</Text>
      <TextInput
        style={[styles.input, defaultStyles.text]}
        value={description}
        onChangeText={setDescription}
        multiline
        placeholder="Enter description"
      />
      <Text style={[styles.label, defaultStyles.text]}>Publish Type</Text>
      <Picker
        selectedValue={publishType}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setPublishType(itemValue)}
      >
        <Picker.Item label="Page" value="page" />
        <Picker.Item label="Performance" value="performance" />
        <Picker.Item label="Else" value="else" />
      </Picker>
      <Button title="Publish" onPress={handlePublish} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.light,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5
  },
  label: {
    marginBottom: 10,
    fontWeight: "bold"
  },
  picker: {
    marginBottom: 20,
  },
});

export default EditScreen;
