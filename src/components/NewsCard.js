import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function NewsCard({ title, image, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#f7f7f7",
    marginBottom: 12,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
  },
  image: {
    width: 100,
    height: 90,
  },
  info: {
    flex: 1,
    padding: 8,
    justifyContent: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
  },
});
