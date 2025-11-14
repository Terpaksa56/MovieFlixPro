import { useEffect, useState } from "react";
import { tmdbApi } from "@/services/tmdb";
import MovieCard from "@/components/MovieCard";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, Flame } from "lucide-react";

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const trending = await tmdbApi.getTrending();
        if (Array.isArray(trending)) {
          setMovies(trending);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error("Error fetching trending movies:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-12">
        <div className="container mx-auto px-4">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[...Array(12)].map((_, i) => (
              <Skeleton key={i} className="h-80 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-8 animate-fade-in">
          <div className="relative">
            <Flame className="w-12 h-12 text-primary animate-pulse" />
            <div className="absolute inset-0 bg-primary/30 blur-xl" />
          </div>
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Trending Now
            </h1>
            <p className="text-muted-foreground mt-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Most popular movies right now
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {movies.map((movie, index) => (
            <div 
              key={movie.id}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;
