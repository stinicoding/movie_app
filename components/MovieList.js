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
  getTopRated,
  getTrendingWeek,
  getUpcoming,
} from "../utils/functionsAPI.js";

export default function MovieList({ setShowPage, setMovieDetails, showList }) {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const [topMovies, setTopMovies] = useState([]);
  const [trendingWeek, setTrendingWeek] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  //console.log(topMovies);

  const formatDate = (movie) => {
    const [year, month, day] = movie.release_date.split("-");
    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
  };

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
          <ScrollView style={styles.page}>
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
                      key={movie.id}
                    >
                      <Text style={styles.ranking}>{idx + 1}</Text>
                      <Image
                        style={styles.poster}
                        source={{ uri: IMAGE_BASE_URL + movie.poster_path }}
                      />
                      <Text style={styles.rating_top}>
                        Rating: {movie.vote_average}
                      </Text>
                    </Pressable>
                  );
                })}
            </View>
          </ScrollView>
        </View>
      )}
      {showList === "Trending" && (
        <View>
          <Text style={styles.caption}>Trending of the Week</Text>
          <ScrollView style={styles.page}>
            <View style={styles.container}>
              {trendingWeek?.length > 0 &&
                trendingWeek.map((movie, idx) => {
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
                      <Text style={styles.rating_trending}>
                        Rating: {movie.vote_average}
                      </Text>
                    </Pressable>
                  );
                })}
            </View>
          </ScrollView>
        </View>
      )}
      {showList === "Upcoming" && (
        <View>
          <Text style={styles.caption}> Coming Soon</Text>
          <ScrollView style={styles.page}>
            <View style={styles.container}>
              {upcomingMovies?.length > 0 &&
                upcomingMovies.map((movie, idx) => {
                  return (
                    <Pressable
                      style={styles.imgwrapper}
                      onPress={() => {
                        setMovieDetails(movie);
                        setShowPage("MovieDetails");
                      }}
                      key={movie.id}
                    >
                      <Text style={styles.date}>{formatDate(movie)}</Text>
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
  page: {
    marginBottom: 60,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 170,
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
    marginBottom: 5,
  },
  imgwrapper: {
    width: "40%",
    marginHorizontal: "5%",
  },
  ranking: {
    flex: 1,
    width: 40,
    height: 40,
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    backgroundColor: "#740168ff",
    borderRadius: 50,
    marginBottom: "5%",
    marginTop: "5%",
    textAlign: "center",
    justifyContent: "center",
    lineHeight: 40,
  },
  rating_top: {
    fontFamily: "Inter",
    fontSize: 16,
    color: "white",
    marginTop: "4%",
    marginBottom: "7%",
  },
  rating_trending: {
    fontFamily: "Inter",
    fontSize: 16,
    color: "white",
    marginTop: "4%",
    marginBottom: "18%",
  },
  date: {
    fontFamily: "Inter",
    fontSize: 16,
    color: "white",
    marginTop: "7%",
    marginBottom: "4%",
  },
});
