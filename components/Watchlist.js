import { StyleSheet, Text, View, Image, ScrollView, Pressable } from "react-native";

export default function Watchlist({ setShowPage, watchlist, setMovieDetails }) {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  //console.log(watchlist);
  return (
    <View>
      <View style={styles.icons}>
        <Text style={styles.icon} onPress={() => setShowPage("Startpage")}>
          ⇦
        </Text>
        <Text style={styles.icon}>My Watchlist ♥</Text>
      </View>
      <ScrollView>
        <View style={styles.container}>
          {watchlist?.length > 0 &&
            watchlist.map((movie, idx) => {
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
                </Pressable>
              );
            })}
        </View>
      </ScrollView>
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
