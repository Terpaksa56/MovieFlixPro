const TMDB_API_KEY = "8d11b42733d44d6e86e5d8c0dda5f9f3";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const getImageUrl = (path, size = "w500") => {
  if (!path) return "https://via.placeholder.com/500x750?text=No+Image";
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const tmdbApi = {
  getTrending: async () => {
    const response = await fetch(
      `${TMDB_BASE_URL}/trending/movie/day?api_key=${TMDB_API_KEY}`
    );
    const data = await response.json();
    return data.results;
  },

  getPopular: async () => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`
    );
    const data = await response.json();
    return data.results;
  },

  searchMovies: async (query) => {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
        query
      )}`
    );
    const data = await response.json();
    return data.results;
  },

  getMovieDetails: async (movieId) => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`
    );
    return await response.json();
  },

  getSimilarMovies: async (movieId) => {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${movieId}/similar?api_key=${TMDB_API_KEY}`
    );
    const data = await response.json();
    return data.results;
  },
};
