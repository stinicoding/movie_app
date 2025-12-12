import { StyleSheet, Text, View, Image } from "react-native";
import axios from "axios";
import { API_KEY } from "./config.js";
import { useEffect, useState } from "react";
import LANGUAGES from "../data.js";

export default function MovieDetails({ setShowPage, movie }) {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const GENRES = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
  const CAST = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}`;

  const [year, month, day] = movie.release_date.split("-");
  const formattedDate = `${day}.${month}.${year}`;
  const stars = Math.round(movie.vote_average / 2);
  const maxStars = 5;

  const [genres, setGenres] = useState([]);
  const [cast, setCast] = useState([]);

  const findGenres = async () => {
    try {
      const response = await axios.get(GENRES);
      const all_genres = response.data.genres;
      const genre_list = movie.genre_ids.map((id) => {
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
      const cast_list = all_cast.slice(0, 5).map((c) => c?.name);
      setCast(cast_list);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    findGenres();
    findCast();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.right}>
        <Text style={styles.button} onPress={() => setShowPage("Startpage")}>
          Back
        </Text>
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  caption: {
    fontFamily: "Helvetica",
    fontSize: 21,
    color: "white",
    marginBottom: 10,
  },
  text: {
    fontFamily: "Helvetica",
    fontSize: 16,
    color: "white",
  },
  info: {
    fontFamily: "Helvetica",
    fontSize: 16,
    color: "white",
    marginBottom: 5,
  },
  button: {
    fontFamily: "Helvetica",
    fontSize: 16,
    color: "#011f65ff",
    backgroundColor: "white",
    borderRadius: 5,
    textAlign: "center",
    width: 50,
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
