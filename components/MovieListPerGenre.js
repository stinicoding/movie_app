import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import { getMoviesByGenre } from "../utils/functionsAPI";

export default function MovieListPerGenre({
  genre,
  setShowPage,
  setMovieDetails,
}) {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const [movies, setMovies] = useState([]);
  //console.log(movies);

  useEffect(() => {
    const filterMovies = async () => {
      try {
        const response = await getMoviesByGenre(genre.id);
        setMovies(response);
      } catch (error) {
        console.log(error);
      }
    };
    filterMovies();
  }, []);

  return (
    <View>
      <View style={styles.icons}>
        <Text style={styles.icon} onPress={() => setShowPage("GenreOverview")}>
          ⇦
        </Text>
        <Text style={styles.icon} onPress={() => setShowPage("Watchlist")}>
          ♥
        </Text>
      </View>
      <Text style={styles.caption}>{genre.name}</Text>
      <ScrollView style={styles.page}>
        <View style={styles.container}>
          {movies?.length > 0 &&
            movies.map((movie, idx) => {
              return (
                <Pressable
                  style={styles.imgwrapper}
                  onPress={() => {
                    setMovieDetails(movie);
                    setShowPage("MovieDetails");
                  }}
                  key={movie.id}
                >
                  <Image
                    style={styles.poster}
                    source={{ uri: IMAGE_BASE_URL + movie.poster_path }}
                  />
                  <Text style={styles.rating}>
                    Rating: {movie.vote_average}
                  </Text>
                </Pressable>
              );
            })}
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
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 60,
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
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 21,
    color: "pink",
    fontWeight: "600",
    marginBottom: 10,
  },
  poster: {
    width: "100%",
    height: 240,
    borderRadius: 12,
  },
  imgwrapper: {
    width: "40%",
    marginHorizontal: "5%",
  },
  rating: {
    fontFamily: "Inter",
    fontSize: 16,
    color: "white",
    marginTop: "4%",
    marginBottom: "18%",
  },
});
