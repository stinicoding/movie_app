import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import {
  searchMovie,
  getTopRated,
  getTrendingWeek,
  getUpcoming,
} from "../utils/functionsAPI.js";

export default function MovieList({ setShowPage, setMovieDetails, showList }) {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const [topMovies, setTopMovies] = useState([]);
  //const [trendingWeek, setTrendingWeek] = useState([]);
  //const [upcomingMovies, setUpcomingMovies] = useState([]);
  //console.log(topMovies);

  useEffect(() => {
    const loadData = async () => {
      let topRated = await getTopRated();
      //console.log (topRated)
      setTopMovies(topRated);
      //let trending = await getTrendingWeek();
      //setTrendingWeek(trending);
      //let upcoming = await getUpcoming();
      //setUpcomingMovies(upcoming);
    };
    loadData();
  }, []);

  return (
    <View>
      <View style={styles.icons}>
        <Text style={styles.icon} onPress={() => setShowPage("Startpage")}>
          ⇦
        </Text>
        <Text style={styles.icon} onPress={() => setShowPage("Watchlist")}>
          ♥
        </Text>
      </View>
      {showList === "Top100" && (
        <View>
          <Text style={styles.caption}>Top 100 Movies</Text>
          <ScrollView>
            <View style={styles.container}>
              {topMovies?.length > 0 &&
                topMovies.map((movie, idx) => {
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
                    </Pressable>
                  );
                })}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontWeight: 600,
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
    marginVertical: "5%",
  },
});
