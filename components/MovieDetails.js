import { StyleSheet, Text, View, Button } from "react-native";

export default function MovieDetails({ setShowPage, movie }) {
  return (
    <View>
      <Text style={styles.caption}>{movie.title}</Text>
      <Text style={styles.text}>{movie.overview}</Text>
      <Button title="Back" onPress={() => setShowPage("Startpage")} />
    </View>
  );
}

const styles = StyleSheet.create({
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
});
