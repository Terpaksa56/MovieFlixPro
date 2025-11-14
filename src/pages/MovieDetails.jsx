import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { tmdbApi, getImageUrl } from "@/services/tmdb";
import { Star, Calendar, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MovieCard from "@/components/MovieCard";
import { Skeleton } from "@/components/ui/skeleton";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const [details, similar] = await Promise.all([
          tmdbApi.getMovieDetails(id),
          tmdbApi.getSimilarMovies(id),
        ]);
        setMovie(details);
        setSimilarMovies(similar);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <Skeleton className="h-[70vh] w-full" />
        <div className="container mx-auto px-4 py-12">
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-32 w-full mb-8" />
        </div>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Backdrop Hero */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-scale-in"
          style={{
            backgroundImage: `url(${getImageUrl(movie.backdrop_path, "original")})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative h-full container mx-auto px-4 flex items-end pb-12">
          <div className="flex flex-col md:flex-row gap-8 w-full animate-fade-in">
            {/* Poster */}
            <div className="flex-shrink-0">
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                className="w-64 rounded-xl shadow-2xl shadow-primary/20 border-2 border-primary/20 hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              <Link to="/">
                <Button variant="ghost" className="gap-2 mb-4 hover:bg-card rounded-full">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {movie.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 bg-primary/20 backdrop-blur-md px-4 py-2 rounded-full border border-primary/30">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-lg">{movie.vote_average.toFixed(1)}</span>
                  <span className="text-muted-foreground text-sm">/ 10</span>
                </div>

                {movie.release_date && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  </div>
                )}

                {movie.runtime && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-5 h-5" />
                    <span>{movie.runtime} min</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {movie.genres?.map((genre) => (
                  <Badge
                    key={genre.id}
                    variant="secondary"
                    className="px-4 py-1.5 text-sm bg-secondary/20 hover:bg-secondary/30 border border-secondary/30 transition-colors duration-300"
                  >
                    {genre.name}
                  </Badge>
                ))}
              </div>

              <p className="text-lg text-foreground/90 leading-relaxed max-w-3xl">
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Movies */}
      {similarMovies.length > 0 && (
        <div className="container mx-auto px-4 mt-16">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-fade-in">
            Similar Movies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {similarMovies.slice(0, 12).map((movie, index) => (
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
      )}
    </div>
  );
};

export default MovieDetails;
