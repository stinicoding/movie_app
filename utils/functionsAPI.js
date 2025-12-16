import { API_KEY } from "../config.js";
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const tmdbClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

export const searchMovie = async (query) => {
  if (!query) return [];
  try {
    const response = await tmdbClient.get("/search/movie", {
      params: {
        query: query,
        page: 1,
      },
    });
    const topFivePopular = response.data.results
      .filter((movie) => movie.popularity)
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 5);
    return topFivePopular; //setMovies
  } catch (error) {
    console.log(error);
  }
};

//setTopMovies
export const getTopRated = async () => {
  try {
    const requests = [];
    for (let page = 1; page <= 5; page++) {
      requests.push(
        tmdbClient.get("/movie/top_rated", { params: { page } })
      );
    }
    const responses = await Promise.all(requests);
    const allMovies = responses.flatMap(r => r.data.results);
    //console.log(`Fetched ${allMovies.length} movies successfully.`);
    return allMovies;
  } catch (error) {
    console.error("Error fetching top 100:", error);
    return []; // Return empty array so app doesn't crash
  }
};


export const getTrendingWeek = async () => {
  try {
    const response = await tmdbClient.get("/trending/movie/week", {
      params: { page: 1 },
    });
    return response.data.results; //setTrendingWeek
  } catch (error) {
    console.log(error);
  }
};

export const getUpcoming = async () => {
  try {
    const response = await tmdbClient.get("/movie/upcoming", {
      params: { page: 1 },
    });
    return response.data.results; //setUpcomingMovies
  } catch (error) {
    console.log(error);
  }
};
