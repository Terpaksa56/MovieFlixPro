import { Play, Info, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getImageUrl } from "@/services/tmdb";
import { useEffect } from "react";

const Hero = ({ movie }) => {
  useEffect(() => {
    if (!movie) return;
    const url = getImageUrl(movie.backdrop_path || movie.poster_path);
    // add preload link for hero image to improve LCP
    const existing = document.querySelector(`link[rel=preload][href="${url}"]`);
    if (!existing) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = url;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
      return () => {
        try { document.head.removeChild(link); } catch (e) {}
      };
    }
  }, [movie]);

  return (
    <div className="relative h-screen md:h-[90vh] w-full overflow-hidden animate-fade-in">
      {/* Background Image (use <img> for better LCP) */}
      <img
        src={getImageUrl(movie.backdrop_path || movie.poster_path)}
        alt={movie.title || "Featured movie"}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        aria-hidden={false}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 md:px-6 flex items-center justify-center md:justify-start py-8">
        <div className="max-w-2xl space-y-4 md:space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-2 md:gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 md:gap-2 bg-primary/20 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-primary/30 text-sm md:text-base transition-all duration-200 hover:bg-primary/30" style={{ animationDelay: "0.3s" }}>
              <Star className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-bold">{movie.vote_average.toFixed(1)}</span>
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">
              {movie.release_date?.split("-")[0]}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent" style={{ animationDelay: "0.4s" }}>
            {movie.title}
          </h1>

          <p className="text-sm md:text-base lg:text-lg text-foreground/90 line-clamp-2 md:line-clamp-3 leading-relaxed" style={{ animationDelay: "0.5s" }}>
            {movie.overview}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4" style={{ animationDelay: "0.6s" }}>
            <Button 
              size="lg" 
              className="gap-2 md:gap-3 rounded-lg md:rounded-full px-6 md:px-8 py-4 md:py-6 text-sm md:text-lg font-semibold bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-primary/50"
            >
              <Play className="w-5 h-5 md:w-6 md:h-6 fill-current" />
              <span className="hidden sm:inline">Watch Now</span>
              <span className="sm:hidden">Watch</span>
            </Button>
            <Link to={`/movie/${movie.id}`}>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto gap-2 md:gap-3 rounded-lg md:rounded-full px-6 md:px-8 py-4 md:py-6 text-sm md:text-lg font-semibold border-2 hover:bg-card transition-all duration-300 backdrop-blur-sm"
              >
                <Info className="w-5 h-5 md:w-6 md:h-6" />
                <span className="hidden sm:inline">More Details</span>
                <span className="sm:hidden">Details</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default Hero;

