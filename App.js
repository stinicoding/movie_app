import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"; //npm install react-native-safe-area-context
import Startpage from "./components/Startpage.js";
import MovieDetails from "./components/MovieDetails.js";

export default function App() {
  const [showPage, setShowPage] = useState("Startpage");
  const [movieDetails, setMovieDetails] = useState(null);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {showPage === "Startpage" && (
          <Startpage
            setShowPage={setShowPage}
            setMovieDetails={setMovieDetails}
          />
        )}

        {showPage === "MovieDetails" && (
          <MovieDetails setShowPage={setShowPage} movie={movieDetails} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#011f65ff",
  },
});
