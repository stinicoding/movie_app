import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

export default function Watchlist({ setShowPage, watchlist }) {
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  //console.log(watchlist);
  return (
    <ScrollView>
      <View style={styles.icons}>
        <Text style={styles.icon} onPress={() => setShowPage("Startpage")}>
          ⇦
        </Text>
        <Text style={styles.icon}>My Watchlist ♥</Text>
      </View>
      <View style={styles.container}>
        {watchlist?.length > 0 &&
          watchlist.map((movie, idx) => {
            return (
              <Image
                key={idx}
                style={styles.poster}
                source={{ uri: IMAGE_BASE_URL + movie.poster_path }}
                onPress={() => setShowPage("MovieDetails")}
              />
            );
          })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
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
    width: 170,
    height: 250,
    marginHorizontal: 10,
    borderRadius: 12,
  },
});
