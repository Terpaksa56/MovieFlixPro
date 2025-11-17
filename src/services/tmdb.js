// OMDB API Configuration
// Get your API key from https://www.omdbapi.com/apikey.aspx

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY || "ba76f17d";
const OMDB_BASE_URL = "https://www.omdbapi.com";

// Simple in-memory cache dengan TTL
class CacheManager {
  constructor() {
    this.cache = new Map();
    this.timers = new Map();
  }

  set(key, value, ttlMs = 3600000) { // 1 hour default
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
    }
    this.cache.set(key, value);
    const timer = setTimeout(() => {
      this.cache.delete(key);
      this.timers.delete(key);
    }, ttlMs);
    this.timers.set(key, timer);
  }

  get(key) {
    return this.cache.get(key);
  }

  has(key) {
    return this.cache.has(key);
  }

  clear() {
    this.cache.clear();
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers.clear();
  }
}

const movieCache = new CacheManager();

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

// Optimized delay dengan batching
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Batch multiple requests dengan concurrency limit
const batchFetch = async (items, fetchFn, concurrency = 3, delayMs = 50) => {
  const results = [];
  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    const batchResults = await Promise.all(batch.map(fetchFn));
    results.push(...batchResults);
    if (i + concurrency < items.length) {
      await delay(delayMs);
    }
  }
  return results.filter(Boolean);
};

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
    // Check cache first
    const cacheKey = `movie_${imdbId}`;
    if (movieCache.has(cacheKey)) {
      return movieCache.get(cacheKey);
    }

    const response = await fetch(
      `${OMDB_BASE_URL}/?i=${imdbId}&apikey=${OMDB_API_KEY}&type=movie`,
      { signal: AbortSignal.timeout(5000) } // 5 second timeout
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
    const movie = {
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

    // Cache for 1 hour
    movieCache.set(cacheKey, movie, 3600000);
    return movie;
  } catch (error) {
    console.error(`Error fetching movie ${imdbId}:`, error.message);
    return null;
  }
};

export const tmdbApi = {
  getTrending: async () => {
    try {
      return await batchFetch(TRENDING_MOVIES, fetchMovieById, 4, 50);
    } catch (error) {
      return handleApiError(error);
    }
  },

  getPopular: async () => {
    try {
      return await batchFetch(POPULAR_MOVIES, fetchMovieById, 4, 50);
    } catch (error) {
      return handleApiError(error);
    }
  },

  searchMovies: async (query) => {
    try {
      if (!query || query.length < 2) return [];

      const cacheKey = `search_${query.toLowerCase()}`;
      if (movieCache.has(cacheKey)) {
        return movieCache.get(cacheKey);
      }

      const response = await fetch(
        `${OMDB_BASE_URL}/?s=${encodeURIComponent(query)}&apikey=${OMDB_API_KEY}&type=movie&page=1`,
        { signal: AbortSignal.timeout(5000) }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      
      const data = await response.json();

      if (data.Response === "False") {
        return [];
      }

      // Batch fetch details dengan concurrency
      const movieDetails = await batchFetch(
        (data.Search || []).slice(0, 10),
        (movie) => fetchMovieById(movie.imdbID),
        3,
        50
      );

      movieCache.set(cacheKey, movieDetails, 1800000); // 30 min cache
      return movieDetails;
    } catch (error) {
      console.error("Error searching movies:", error);
      return handleApiError(error);
    }
  },

  getMovieDetails: async (movieId) => {
    try {
      const imdbId = movieId.startsWith("tt") ? movieId : `tt${movieId.padStart(7, "0")}`;
      return await fetchMovieById(imdbId);
    } catch (error) {
      handleApiError(error);
      return null;
    }
  },

  getSimilarMovies: async (movieId) => {
    try {
      const cacheKey = `similar_${movieId}`;
      if (movieCache.has(cacheKey)) {
        return movieCache.get(cacheKey);
      }

      const shuffled = [...POPULAR_MOVIES].sort(() => Math.random() - 0.5);
      const movies = await batchFetch(shuffled.slice(0, 12), fetchMovieById, 4, 50);
      movieCache.set(cacheKey, movies, 3600000);
      return movies;
    } catch (error) {
      return handleApiError(error);
    }
  },

  clearCache: () => movieCache.clear(),
};
