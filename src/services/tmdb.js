// OMDB API Configuration
// Get your API key from https://www.omdbapi.com/apikey.aspx

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY || "ba76f17d";
const OMDB_BASE_URL = "https://www.omdbapi.com";

export const getImageUrl = (posterUrl, size = "300") => {
  if (!posterUrl || posterUrl === "N/A") {
    return "https://via.placeholder.com/300x450?text=No+Poster";
  }
  // Add image optimization for OMDB URLs - use high quality
  if (posterUrl.includes("m.media-amazon")) {
    return posterUrl + "?format=jpg&quality=85";
  }
  return posterUrl;
};

const handleApiError = (error) => {
  console.error("OMDB API Error:", error);
  return [];
};

// Add delay to prevent rate limiting
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const POPULAR_MOVIES = [
  "tt0111161", // The Shawshank Redemption
  "tt0068646", // The Godfather
  "tt0071562", // The Godfather Part II
  "tt0468569", // The Dark Knight
  "tt0050083", // 12 Angry Men
  "tt0108052", // Pulp Fiction
  "tt0137523", // Fight Club
  "tt0109830", // Forrest Gump
  "tt0110912", // Reservoir Dogs
  "tt0099685", // Goodfellas
  "tt0103064", // Terminator 2
  "tt0245429", // Donnie Darko
];

const TRENDING_MOVIES = [
  "tt0111161", // The Shawshank Redemption
  "tt0068646", // The Godfather
  "tt0071562", // The Godfather Part II
  "tt0468569", // The Dark Knight
  "tt0050083", // 12 Angry Men
  "tt0108052", // Pulp Fiction
  "tt0137523", // Fight Club
  "tt0109830", // Forrest Gump
  "tt0110912", // Reservoir Dogs
  "tt0099685", // Goodfellas
  "tt0816692", // Interstellar
  "tt1375666", // Inception
];

const fetchMovieById = async (imdbId) => {
  try {
    const response = await fetch(
      `${OMDB_BASE_URL}/?i=${imdbId}&apikey=${OMDB_API_KEY}&type=movie`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.Response === "False") {
      console.warn(`Movie not found: ${imdbId} - ${data.Error}`);
      return null;
    }

    // Transform OMDB response to match our component structure
    return {
      id: data.imdbID,
      title: data.Title,
      overview: data.Plot || "No description available",
      poster_path: data.Poster,
      backdrop_path: data.Poster,
      vote_average: data.imdbRating ? parseFloat(data.imdbRating) : 0,
      release_date: `${data.Year}-01-01`,
      genres: data.Genre?.split(", ").map((g, idx) => ({ id: idx, name: g })) || [],
      runtime: data.Runtime ? parseInt(data.Runtime) : 0,
      imdbID: data.imdbID,
      imdbRating: data.imdbRating,
      imdbVotes: data.imdbVotes,
    };
  } catch (error) {
    console.error(`Error fetching movie ${imdbId}:`, error.message);
    return null;
  }
};

export const tmdbApi = {
  getTrending: async () => {
    try {
      const movies = [];
      for (const id of TRENDING_MOVIES) {
        const movie = await fetchMovieById(id);
        if (movie) movies.push(movie);
        await delay(200); // Add delay to prevent rate limiting
      }
      return movies;
    } catch (error) {
      return handleApiError(error);
    }
  },

  getPopular: async () => {
    try {
      const movies = [];
      for (const id of POPULAR_MOVIES) {
        const movie = await fetchMovieById(id);
        if (movie) movies.push(movie);
        await delay(200); // Add delay to prevent rate limiting
      }
      return movies;
    } catch (error) {
      return handleApiError(error);
    }
  },

  searchMovies: async (query) => {
    try {
      if (!query || query.length < 2) return [];

      const response = await fetch(
        `${OMDB_BASE_URL}/?s=${encodeURIComponent(query)}&apikey=${OMDB_API_KEY}&type=movie&page=1`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      
      const data = await response.json();

      if (data.Response === "False") {
        return [];
      }

      // Get full details for each search result with delay
      const movieDetails = [];
      for (const movie of (data.Search || []).slice(0, 10)) {
        const details = await fetchMovieById(movie.imdbID);
        if (details) movieDetails.push(details);
        await delay(200);
      }

      return movieDetails;
    } catch (error) {
      console.error("Error searching movies:", error);
      return handleApiError(error);
    }
  },

  getMovieDetails: async (movieId) => {
    try {
      // If movieId looks like a number, assume it's an OMDB imdbID format
      const imdbId = movieId.startsWith("tt") ? movieId : `tt${movieId.padStart(7, "0")}`;
      return await fetchMovieById(imdbId);
    } catch (error) {
      handleApiError(error);
      return null;
    }
  },

  getSimilarMovies: async (movieId) => {
    try {
      // Get a random selection of popular movies as "similar"
      const shuffled = [...POPULAR_MOVIES].sort(() => Math.random() - 0.5);
      const movies = [];
      for (const id of shuffled.slice(0, 12)) {
        const movie = await fetchMovieById(id);
        if (movie) movies.push(movie);
        await delay(200);
      }
      return movies;
    } catch (error) {
      return handleApiError(error);
    }
  },
};
