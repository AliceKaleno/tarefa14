import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image
} from "react-native";

export default function NewListScreen({ navigation }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNews() {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/AliceKaleno/noticias-app/main/news.json"
        );

        if (!response.ok) throw new Error("Erro na API");

        const data = await response.json();
        setNews(data);
      } catch (err) {
        setError("Erro ao carregar notícias.");
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#1a237e" />
        <Text style={{ marginTop: 10 }}>Carregando notícias...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📰 Notícias do ENEM</Text>

      <FlatList
        data={news}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("NewsScreen", { url: item.url })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.source}>{item.source}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef1f8",
    padding: 12,
  },
  header: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#1a237e",
    textAlign: "center",
    marginBottom: 15,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 14,
    borderRadius: 12,
    elevation: 3,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  source: {
    marginTop: 4,
    color: "#666",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    textAlign: "center",
    color: "red",
    fontSize: 18,
  },
});
