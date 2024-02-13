import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

function DetailsScreen({ route }) {
  const { item } = route.params;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.title}</Text>
      <Text style={styles.detail}>Location: {item.location}</Text>
      <Text style={styles.detail}>Type: {item.type}</Text>
      <Text style={styles.comments}>Comments: {item.comments}</Text>
      <Text style={styles.rating}>Ratings: {item.ratings} / 5</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%', // Take up all container width
    height: 200, // Fixed height for the image
    borderRadius: 10, // Optional: if you want rounded corners
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 18,
    marginBottom: 5,
  },
  comments: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  rating: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default DetailsScreen;

