import { StyleSheet, Text, View, TextInput } from "react-native";
import { useState, useEffect } from "react";
import Carousel from "./Carousel.js";
import {
  searchMovie,
  getTopRated,
  getTrendingWeek,
  getUpcoming,
} from "../utils/functionsAPI.js";

export default function Startpage({ setShowPage, setMovieDetails }) {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [trendingWeek, setTrendingWeek] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    const updateSearch = async () => {
      if (search.length === 0) {
        setMovies([]);
        return;
      }
      let movie = await searchMovie(search);
      setMovies(movie);
    };
    updateSearch()
  }, [search]);

  useEffect(() => {
    const loadData = async () => {
      let topRated = await getTopRated();
      //console.log (topRated)
      setTopMovies(topRated);
      let trending = await getTrendingWeek();
      setTrendingWeek(trending);
      let upcoming = await getUpcoming();
      setUpcomingMovies(upcoming);
    };
    loadData();
  }, []);

  return (
    <View>
      <View style={styles.icons}>
        <Text style={styles.icon}>⇦</Text>
        <Text style={styles.icon} onPress={() => setShowPage("Watchlist")}>
          ♥
        </Text>
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
