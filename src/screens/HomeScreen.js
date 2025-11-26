import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
  source={require("../assets/LogoEnem.png")}
  style={styles.logo}
/>


      <Text style={styles.title}>Portal de Notícias do ENEM</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("NewListScreen")}
      >
        <Text style={styles.buttonText}>Acessar Notícias</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eef1f8",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a237e",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#1a237e",
    padding: 15,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
