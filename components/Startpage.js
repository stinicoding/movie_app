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
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

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
      const topFivePopular = response.data.results
      .filter(movie => movie.popularity)
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 5);
      setMovies(topFivePopular);
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

  const getUpcoming = async () => {
    try {
      const response = await tmdbClient.get("/movie/upcoming", {
        params: { page: 1 },
      });
      setUpcomingMovies(response.data.results);
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
    getUpcoming();
  }, []);

  return (
    <View>
      <View style={styles.icons}>
        <Text style={styles.icon}>⇦</Text>
        <Text style={styles.icon} onPress={()=>setShowPage("Watchlist")}>♥</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.caption}>Find your next Movie</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setSearch(text)}
          />
        </View>
        {movies.length > 0 && (
          <View style={styles.search}>
            {movies.map((movie, idx) => (
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
        )}
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
        <View style={styles.carousel}>
          <Text style={styles.scroll_caption}>Coming Soon</Text>
          <Carousel
            data={upcomingMovies}
            onPress={(movie) => {
              setMovieDetails(movie);
              setShowPage("MovieDetails");
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  box: {
    backgroundColor: "#f5f5f55c",
    borderRadius: 10,
    padding: 15,
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
    fontWeight: 600,
    marginBottom: 10,
  },
  input: {
    fontFamily: "Inter",
    fontSize: 16,
    backgroundColor: "white",
    width: 210,
    borderRadius: 5,
    marginBottom: 10,
  },
  search: {
    backgroundColor: "#f5f5f5b3",
    borderRadius: 10,
    padding: 10,
    marginRight: 15,
    marginLeft: 15,
  },
  suggestions: {
    fontFamily: "Inter",
    fontSize: 16,
    color: "black",
    alignItems: "flex-start",
  },
  poster: {
    width: 170,
    height: 250,
    marginHorizontal: 10,
    borderRadius: 12,
  },
  scroll_caption: {
    fontFamily: "Inter",
    fontSize: 20,
    color: "pink",
    marginBottom: 10,
    marginTop: 20,
    textAlign: "center",
  },
  carousel: {
    width: "100%",
  },
});
