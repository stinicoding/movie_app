import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useState, useEffect } from "react";
import { API_KEY } from "../config.js";
import axios from "axios";

export default function GenreOverview({ setShowPage, setGenre }) {
  const GENRES = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  const [genres, setGenres] = useState([]);
  //console.log(genres);

  const getGenres = async () => {
    try {
      const response = await axios.get(GENRES);
      const all_genres = response.data.genres;
      setGenres(all_genres);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <View>
      <View style={styles.icons}>
        <Ionicons
          name="chevron-back-circle"
          size={35}
          color="pink"
          onPress={() => setShowPage("Startpage")}
        />
        <View style={styles.icons}>
          <Text style={styles.icon}>Genres </Text>
          <Ionicons name="filter-sharp" size={35} color="pink" />
        </View>
      </View>
      <ScrollView style={styles.page}>
        <View style={styles.container}>
          {genres?.map((genre, idx) => (
            <Pressable
              key={genre.id}
              style={styles.box}
              onPress={() => {
                setShowPage("MovieListPerGenre");
                setGenre(genre);
              }}
            >
              <Text style={styles.caption}>{genre.name}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    marginBottom: 60,
  },
  container: {
    margin: 10,
  },
  box: {
    backgroundColor: "#f5f5f55c",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    alignItems: "center",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  icon: {
    fontSize: 35,
    color: "pink",
  },
  caption: {
    fontFamily: "Inter",
    fontSize: 21,
    color: "#3a0381ff",
    fontWeight: "600",
  },
});
