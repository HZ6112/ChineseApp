import {Pressable, StyleSheet, Image} from "react-native";
import { useState } from "react";
import userImage from "../assets/userImage.jpg";
import {
    launchImagePicker,
    uploadImageAsync,
  } from "../utils/imagePickerHelper";

const PostImagePicker = (props) => {
    const [image, setImage] = useState(userImage);
    const [isLoading, setIsLoading] = useState(false);
    const pickImage = async () => {
        try {
            const tempUri = await launchImagePicker([1,2]);
            if (!tempUri) return;
            setIsLoading(true);
            // const uploadUrl = await uploadImageAsync(tempUri);
            // setIsLoading(false);
            // if (!uploadUrl) {
            //     throw new Error("could not upload image");
            // }
            setImage({ uri: uploadUrl });
            } catch (error) {
            console.log(error);
            setIsLoading(false);
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
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default PostImagePicker;