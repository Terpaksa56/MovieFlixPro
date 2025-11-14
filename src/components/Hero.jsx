import { Play, Info, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/services/tmdb";
import { Link } from "react-router-dom";

const Hero = ({ movie }) => {
  return (
    <div className="relative h-[90vh] w-full overflow-hidden animate-fade-in">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center animate-scale-in"
        style={{
          backgroundImage: `url(${getImageUrl(movie.backdrop_path, "original")})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <div className="max-w-2xl space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-primary/20 backdrop-blur-md px-4 py-2 rounded-full border border-primary/30 animate-scale-in" style={{ animationDelay: "0.3s" }}>
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-lg">{movie.vote_average.toFixed(1)}</span>
            </div>
            <span className="text-muted-foreground">
              {movie.release_date?.split("-")[0]}
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {movie.title}
          </h1>

          <p className="text-lg text-foreground/90 line-clamp-3 leading-relaxed animate-fade-in" style={{ animationDelay: "0.5s" }}>
            {movie.overview}
          </p>

          <div className="flex flex-wrap gap-4 pt-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Button 
              size="lg" 
              className="gap-3 rounded-full px-8 py-6 text-lg font-semibold bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/30"
            >
              <Play className="w-6 h-6 fill-current" />
              Watch Now
            </Button>
            <Link to={`/movie/${movie.id}`}>
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-3 rounded-full px-8 py-6 text-lg font-semibold border-2 hover:bg-card hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                <Info className="w-6 h-6" />
                More Details
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
