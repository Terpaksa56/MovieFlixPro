import { useEffect, useState } from "react";
import { tmdbApi } from "@/services/tmdb";
import Hero from "@/components/Hero";
import MovieSection from "@/components/MovieSection";
import { Skeleton } from "@/components/ui/skeleton";

const Home = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trending, popular] = await Promise.all([
          tmdbApi.getTrending(),
          tmdbApi.getPopular(),
        ]);

        if (trending && trending.length > 0) {
          setFeaturedMovie(trending[0]);
          setTrendingMovies(trending);
        }
        
        if (popular && popular.length > 0) {
          setPopularMovies(popular);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <Skeleton className="h-[90vh] w-full" />
        <div className="container mx-auto px-4 py-12">
          <Skeleton className="h-10 w-64 mb-8" />
          <div className="flex gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-80 w-56 flex-none" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {featuredMovie && <Hero movie={featuredMovie} />}
      {trendingMovies.length > 0 && (
        <MovieSection title="Trending Now" movies={trendingMovies} />
      )}
      {popularMovies.length > 0 && (
        <MovieSection title="Popular Movies" movies={popularMovies} />
      )}
    </div>
  );
};

export default Home;
