import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useState, useEffect, useMemo } from "react";
import { getMoviesByGenre } from "../utils/functionsAPI";

export default function MovieListPerGenre({
  genre,
  setShowPage,
  setMovieDetails,
  sorting,
  setSorting,
  openSorting,
  setOpenSorting,
}) {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const [movies, setMovies] = useState([]);
  //console.log(movies);

  const sortingOptions = ["alphabet", "rating", "release date", "popularity"];

  const sortMovies = (movies, sortedby) => {
    const arr = [...movies];
    switch (sortedby) {
      case "release date":
        return arr.sort(
          (a, b) => new Date(a.release_date) - new Date(b.release_date),
        );
      case "popularity":
        return arr.sort((a, b) => b.popularity - a.popularity);
      case "alphabet":
        return arr.sort((a, b) => a.title.localeCompare(b.title));
      case "rating":
        return arr.sort((a, b) => b.vote_average - a.vote_average);
      default:
        return arr;
    }
  };

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

  const sortedMovies = useMemo(() => {
    return sortMovies(movies, sorting);
  }, [movies, sorting]);

  return (
    <View>
      <View style={styles.icons}>
        <Ionicons
          name="chevron-back-circle"
          size={35}
          color="pink"
          onPress={() => setShowPage("GenreOverview")}
        />
        <Ionicons
          name="heart"
          size={35}
          color="pink"
          onPress={() => setShowPage("Watchlist")}
        />
      </View>
      <Text style={styles.caption}>{genre.name}</Text>
      <View style={styles.sortingview}>
        <Pressable onPress={() => setOpenSorting(true)}>
          <Text style={styles.sorting_bold}>Sorted by: {sorting}</Text>
        </Pressable>
        {openSorting &&
          sortingOptions
            .filter((ele) => ele !== sorting)
            .map((ele, idx) => (
              <Pressable
                key={idx}
                onPress={() => {
                  setSorting(ele);
                  setOpenSorting(false);
                }}
              >
                <Text style={styles.sorting}>{ele}</Text>
              </Pressable>
            ))}
      </View>
      <ScrollView style={styles.page}>
        <View style={styles.container}>
          {sortedMovies?.length > 0 &&
            sortedMovies.map((movie, idx) => {
              return (
                <Pressable
                  style={styles.imgwrapper}
                  onPress={() => {
                    setMovieDetails(movie);
                    setShowPage("MovieDetails");
                  }}
                  key={idx}
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
  sorting: {
    fontFamily: "Inter",
    fontSize: 16,
    backgroundColor: "white",
    color: "#011748",
    textAlign: "center",
    padding: 5,
    borderRadius: 5,
    marginLeft: "10%",
    marginRight: "10%",
    marginBottom: 5,
  },
  sorting_bold: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "600",
    backgroundColor: "white",
    color: "#011748",
    textAlign: "center",
    padding: 5,
    borderRadius: 5,
    marginLeft: "10%",
    marginRight: "10%",
    marginBottom: 5,
  },
  sortingview: {
    marginBottom: 10,
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
