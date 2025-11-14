import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { tmdbApi } from "@/services/tmdb";
import MovieCard from "@/components/MovieCard";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      
      setLoading(true);
      try {
        const results = await tmdbApi.searchMovies(query);
        setMovies(results);
      } catch (error) {
        console.error("Error searching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-12">
        <div className="container mx-auto px-4">
          <Skeleton className="h-12 w-96 mb-8" />
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
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Search Results for "{query}"
          </h1>
          <p className="text-muted-foreground">
            Found {movies.length} {movies.length === 1 ? 'result' : 'results'}
          </p>
        </div>

        {movies.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
            <div className="relative mb-6">
              <Search className="w-20 h-20 text-muted-foreground" />
              <div className="absolute inset-0 bg-primary/20 blur-2xl" />
            </div>
            <h2 className="text-3xl font-semibold mb-3">No movies found</h2>
            <p className="text-muted-foreground text-lg">
              Try searching with different keywords
            </p>
          </div>
        )}

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

export default SearchResults;
