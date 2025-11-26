import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Linking,
} from "react-native";

export default function NewListScreen() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNews() {
      try {
        const response = await fetch(
          "https://gnews.io/api/v4/search?q=enem&lang=pt&country=br&max=20&apikey=de45eea0155a2d75788f69b2260f046b"
        );

        if (!response.ok) throw new Error("Erro na API GNews");

        const data = await response.json();

        if (!data.articles || data.articles.length === 0) {
          setError("Nenhuma notícia encontrada.");
        } else {
          setNews(data.articles);
        }
      } catch (err) {
        console.log(err);
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
      <Text style={styles.header}>📰 Notícias atualizadas do ENEM</Text>

      <FlatList
        data={news}
        showsVerticalScrollIndicator={true}   
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => Linking.openURL(item.url)}
          >
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.image} />
            ) : (
              <View style={styles.placeholder}>
                <Text>Sem imagem</Text>
              </View>
            )}

            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.source}>{item.source.name}</Text>
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
    marginBottom: 14,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    height: 90, 
  },
  image: {
    width: 110,
    height: 90,
  },
  placeholder: {
    width: 110,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ddd",
  },
  info: {
    flex: 1,
    padding: 10,
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
