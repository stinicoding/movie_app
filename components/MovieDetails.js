import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import axios from "axios";
import { API_KEY } from "../config.js";
import { useEffect, useState } from "react";
import LANGUAGES from "../data.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MovieDetails({
  setShowPage,
  movie,
  watchlist,
  setWatchlist,
  back,
}) {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const GENRES = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  const CAST = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}`;

  const [year, month, day] = movie.release_date.split("-");
  const formattedDate = `${day}.${month}.${year}`;
  const stars = Math.round(movie.vote_average / 2);
  const maxStars = 5;

  const [genres, setGenres] = useState([]);
  const [cast, setCast] = useState([]);
  const [fav, setFav] = useState(false);

  //console.log(watchlist)

  const findGenres = async () => {
    try {
      const response = await axios.get(GENRES);
      const all_genres = response.data.genres;
      const genre_list = movie?.genre_ids?.map((id) => {
        return all_genres.find((g) => g.id === id)?.name;
      });
      setGenres(genre_list);
    } catch (error) {
      console.log(error);
    }
  };

  const findCast = async () => {
    try {
      const response = await axios.get(CAST);
      const all_cast = response.data.cast;
      const cast_list = all_cast?.slice(0, 5).map((c) => c?.name);
      setCast(cast_list);
    } catch (error) {
      console.log(error);
    }
  };

  const searchMovieInWatchlist = async () => {
    try {
      let found = watchlist.find((m) => m.id == movie.id);
      //console.log(found);
      found && setFav(true);
      if (found) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateWatchlist = async (action) => {
    let found = await searchMovieInWatchlist();
    //console.log(found);
    //delete favorite
    if (action === "delete" && found) {
      try {
        const filteredMovies = watchlist.filter((m) => m.id !== movie.id);
        await AsyncStorage.setItem("favs", JSON.stringify(filteredMovies));
        setWatchlist(filteredMovies);
        setFav(false);
      } catch (error) {
        console.log(error);
      }
      return;
    }
    //add favorite
    else if (action === "add" && !fav) {
      try {
        const previousMovies = await AsyncStorage.getItem("favs");
        let storedMovies;
        if (previousMovies === null) {
          storedMovies = await AsyncStorage.setItem(
            "favs",
            JSON.stringify([movie]),
          );
        } else {
          storedMovies = await AsyncStorage.setItem(
            "favs",
            JSON.stringify([...JSON.parse(previousMovies), movie]),
          );
        }
        //console.log(storedMovies);
        setWatchlist(storedMovies);
        setFav(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    findGenres();
    findCast();
    searchMovieInWatchlist();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.icons}>
        <Ionicons
          name="chevron-back-circle"
          size={35}
          color="pink"
          onPress={() => setShowPage(back)}
        />
        {fav ? (
          <Ionicons
            name="heart"
            size={35}
            color="pink"
            onPress={() => {
              updateWatchlist("delete");
            }}
          />
        ) : (
          <Ionicons
            name="heart-outline"
            size={35}
            color="pink"
            onPress={() => {
              updateWatchlist("add");
            }}
          />
        )}
      </View>
      <ScrollView>
        <View>
          <Text style={styles.caption}>{movie.title}</Text>
          <Text style={styles.text}>{movie.overview}</Text>
        </View>
        <View style={styles.center}>
          <Image
            style={styles.poster}
            source={{ uri: IMAGE_BASE_URL + movie.poster_path }}
          />
        </View>
        <View>
          <Text style={styles.info}>Released: {formattedDate}</Text>
          <Text style={styles.info}>Genres: {genres.join(", ")}</Text>
          <Text style={styles.info}>Cast: {cast.join(", ")}</Text>
          <Text style={styles.info}>
            Original Language: {LANGUAGES[movie.original_language]}
          </Text>
          <Text style={styles.info}>
            Rating: {movie.vote_average}{" "}
            {"★".repeat(stars) + "☆".repeat(maxStars - stars)}
          </Text>
          <Text style={styles.info}>Popularity: {movie.popularity}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  caption: {
    fontFamily: "Inter",
    fontSize: 21,
    color: "white",
    fontWeight: "600",
    marginBottom: 10,
  },
  text: {
    fontFamily: "Inter",
    fontSize: 16,
    color: "white",
  },
  info: {
    fontFamily: "Inter",
    fontSize: 16,
    color: "white",
    marginBottom: 5,
  },
  icon: {
    fontSize: 35,
    color: "pink",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  poster: {
    width: 200,
    height: 300,
    borderRadius: 10,
    margin: 20,
  },
  center: {
    alignItems: "center",
  },
  right: {
    alignItems: "flex-end",
  },
});
