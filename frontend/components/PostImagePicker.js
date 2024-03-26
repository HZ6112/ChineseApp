import {Pressable, StyleSheet, Image} from "react-native";
import { useState } from "react";
import userImage from "../assets/userImage.jpg";
import {
    launchImagePicker,
  } from "../utils/imagePickerHelper";

const PostImagePicker = (props) => {
    const [image, setImage] = useState(userImage);
    const pickImage = async () => {
        try 
        {
            const tempUri = await launchImagePicker([1,2]);
            if (!tempUri) return;
            setImage({ uri: tempUri });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Pressable onPress={pickImage} style={styles.imagePicker}>
            <Image source={image} style={styles.image}>

            </Image>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    image: {
        padding: 10,
        width: '90%',
        height: '90%'
    },
    imagePicker:{
        backgroundColor: 'powderblue',
        justifyContent: "center",
        alignItems: "center"
    }
});

export default PostImagePicker;