import { useState, useEffect } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"; //npm install react-native-safe-area-context
import Startpage from "./components/Startpage.js";
import MovieDetails from "./components/MovieDetails.js";
import MovieList from "./components/MovieList.js";
import Watchlist from "./components/Watchlist.js";
import GenreOverview from "./components/GenreOverview.js";
import MovieListPerGenre from "./components/MovieListPerGenre.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [showPage, setShowPage] = useState("Startpage");
  const [movieDetails, setMovieDetails] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [back, setBack] = useState("");
  const [showList, setShowList] = useState("");
  const [genre, setGenre] = useState({});
  const [sorting, setSorting] = useState("popularity");

  const getWatchlist = async () => {
    try {
      const movies = await AsyncStorage.getItem("favs");
      //const movies = await AsyncStorage.setItem("favs", JSON.stringify([])); //clearing local storage
      //console.log(JSON.parse(movies))
      setWatchlist(JSON.parse(movies));
      //setWatchlist([]); //clearing local storage
    } catch (error) {
      console.log(error);
    }
  };

  //Navigation for back-button
  useEffect(() => {
    getWatchlist();
    if (showPage === "Startpage") {
      setBack("Startpage");
    } else if (showPage === "Watchlist") {
      setBack("Watchlist");
    } else if (showPage === "MovieList") {
      setBack("MovieList");
    } else if (showPage === "GenreOverview") {
      setBack("GenreOverview");
    } else if (showPage === "MovieListPerGenre") {
      setBack("MovieListPerGenre");
    }
  }, [showPage]);

  return (
    <SafeAreaProvider>
      <ImageBackground
        source={require("./bg.jpg")}
        style={styles.background}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.background}>
          {showPage === "Startpage" && (
            <Startpage
              setShowPage={setShowPage}
              setMovieDetails={setMovieDetails}
              setShowList={setShowList}
            />
          )}
          {showPage === "MovieDetails" && (
            <MovieDetails
              setShowPage={setShowPage}
              movie={movieDetails}
              watchlist={watchlist}
              setWatchlist={setWatchlist}
              back={back}
            />
          )}
          {showPage === "MovieList" && (
            <MovieList
              setShowPage={setShowPage}
              setMovieDetails={setMovieDetails}
              movie={movieDetails}
              showList={showList}
              sorting={sorting}
              setSorting={setSorting}
            />
          )}
          {showPage === "Watchlist" && (
            <Watchlist
              setShowPage={setShowPage}
              watchlist={watchlist}
              setMovieDetails={setMovieDetails}
            />
          )}
          {showPage === "GenreOverview" && (
            <GenreOverview setShowPage={setShowPage} setGenre={setGenre} />
          )}
          {showPage === "MovieListPerGenre" && (
            <MovieListPerGenre
              setShowPage={setShowPage}
              setMovieDetails={setMovieDetails}
              genre={genre}
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
