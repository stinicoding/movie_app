import { useState, useEffect } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"; //npm install react-native-safe-area-context
import Startpage from "./components/Startpage.js";
import MovieDetails from "./components/MovieDetails.js";
import Watchlist from "./components/Watchlist.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [showPage, setShowPage] = useState("Startpage");
  const [movieDetails, setMovieDetails] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

   const getWatchlist = async () => {
    try {
      const movies = await AsyncStorage.getItem("favs");
      setWatchlist(JSON.parse(movies));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWatchlist()
  }, [showPage])

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
            <MovieDetails
              setShowPage={setShowPage}
              movie={movieDetails}
              watchlist={watchlist}
              setWatchlist={setWatchlist}
            />
          )}
          {showPage === "Watchlist" && (
            <Watchlist
              setShowPage={setShowPage}
              movie={movieDetails}
              watchlist={watchlist}
            />
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
