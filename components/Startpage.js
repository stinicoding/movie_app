import { StyleSheet, Text, View, TextInput } from "react-native";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { API_KEY } from "./config.js";
import Carousel from "./Carousel.js";

const BASE_URL = "https://api.themoviedb.org/3";

export default function Startpage({ setShowPage, setMovieDetails }) {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [trendingWeek, setTrendingWeek] = useState([]);

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
      const firstFive = response.data.results.slice(0, 5);
      setMovies(firstFive);
    } catch (error) {
      console.log(error);
    }
  };

  const getTopRated = async () => {
    try {
      const response = await tmdbClient.get("/movie/top_rated", {
        params: { page: 1 },
      });
      setTopMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getTrendingWeek = async () => {
    try {
      const response = await tmdbClient.get("/trending/movie/week", {
        params: { page: 1 },
      });
      setTrendingWeek(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (search.length === 0) {
      setMovies([]);
      return;
    }
    searchMovie(search);
  }, [search]);

  useEffect(() => {
    getTopRated();
    getTrendingWeek();
  }, []);

  return (
    <View style={styles.container}>
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
      <View style={styles.carousel}>
        <Text style={styles.scroll_caption}>Top Movies</Text>
        <Carousel
          data={topMovies}
          onPress={(movie) => {
            setMovieDetails(movie);
            setShowPage("MovieDetails");
          }}
        />
      </View>
      <View style={styles.carousel}>
        <Text style={styles.scroll_caption}>Trending Movies of the Week</Text>
        <Carousel
          data={trendingWeek}
          onPress={(movie) => {
            setMovieDetails(movie);
            setShowPage("MovieDetails");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 50,
  },
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
    marginBottom: 10,
  },
  suggestions: {
    fontFamily: "Helvetica",
    fontSize: 16,
    color: "black",
    backgroundColor: "white",
    alignItems: "flex-start",
  },
  text: {
    fontFamily: "Helvetica",
    fontSize: 16,
    color: "white",
  },
  poster: {
    width: 170,
    height: 250,
    marginHorizontal: 10,
    borderRadius: 12,
  },
  scroll_caption: {
    fontFamily: "Helvetica",
    fontSize: 18,
    color: "white",
    marginBottom: 10,
    marginTop: 20,
    textAlign: "center",
  },
  carousel: {
    width: "100%",
  },
});
