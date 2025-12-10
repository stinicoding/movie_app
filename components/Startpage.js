import { StyleSheet, Text, View, TextInput } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_KEY } from "./config.js";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function Startpage({ setShowPage, setMovieDetails }) {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  const tmdbClient = axios.create({
    baseURL: BASE_URL,
    params: {
      api_key: API_KEY,
      language: "en-US",
    },
  });

  const searchMovie = async (query) => {
    if (!query) return [];
    try {
      const response = await tmdbClient.get("/search/movie", {
        params: {
          query: query,
          page: 1,
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchMovie(search);
  }, [search]);

  return (
    <View>
      <Text style={styles.caption}>Find your next movie!</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setSearch(text)}
      />
      {movies.length > 0 &&
        movies.map((movie, idx) => (
          <Text
            key={idx}
            style={styles.suggestions}
            onPress={() => {
              setMovieDetails(movie);
              setShowPage("MovieDetails");
            }}
          >
            {movie.title}
          </Text>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  caption: {
    fontFamily: "Helvetica",
    fontSize: 21,
    color: "white",
    marginBottom: 10,
  },
  input: {
    fontFamily: "Helvetica",
    fontSize: 16,
    backgroundColor: "white",
    width: 200,
    borderRadius: 5,
    marginBottom: 20,
  },
  suggestions: {
    fontFamily: "Helvetica",
    fontSize: 16,
    color: "black",
    backgroundColor: "white",
  },
});
