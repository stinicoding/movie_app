import { useState } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"; //npm install react-native-safe-area-context
import Startpage from "./components/Startpage.js";
import MovieDetails from "./components/MovieDetails.js";

export default function App() {
  const [showPage, setShowPage] = useState("Startpage");
  const [movieDetails, setMovieDetails] = useState(null);

  return (
    <SafeAreaProvider>
      <ImageBackground
        source={require("./purple.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <SafeAreaView>
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
      </ImageBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
