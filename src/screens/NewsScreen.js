import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking } from "react-native";

export default function NewsScreen({ route, navigation }) {
  const { url } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>⬅ Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Acesse a notícia completa no link abaixo:</Text>

      <TouchableOpacity onPress={() => Linking.openURL(url)}>
        <Text style={styles.link}>{url}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#eef1f8",
  },
  back: {
    marginBottom: 20,
  },
  backText: {
    fontSize: 18,
    color: "#1a237e",
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  link: {
    fontSize: 16,
    color: "blue",
  },
});
