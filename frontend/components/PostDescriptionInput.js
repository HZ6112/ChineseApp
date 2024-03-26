import React, {useState, useEffect} from 'react';
import {Keyboard, ScrollView, TextInput, StyleSheet, Pressable, View} from 'react-native';

const PostDescriptionInput = (props) => {
    const [text, setText] = useState('');
    const setTyping = (typing) => {
        props.updateTypingStatus(typing);
        console.log(typing);
    };
    return (
        <View style={styles.container} >
            <TextInput placeholder='Write a description...' style={styles.input} onChangeText={newText => setText(newText)} defaultValue={text} editable={true} >
            </TextInput>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: 'black',
        borderWidth: 1,
        flex: 1
    },
    input: {
        padding: '1%',
        maxHeight: 100
    }
});

export default PostDescriptionInput;