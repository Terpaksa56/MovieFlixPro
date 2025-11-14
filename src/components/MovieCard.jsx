import { Link } from "react-router-dom";
import { getImageUrl } from "@/services/tmdb";
import { Star, Play } from "lucide-react";

const MovieCard = ({ movie }) => {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group block relative rounded-xl overflow-hidden bg-card transition-all duration-500 hover:scale-[1.08] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:-translate-y-2"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:brightness-50"
          loading="lazy"
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="bg-primary/90 backdrop-blur-sm rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-500 shadow-lg shadow-primary/50">
            <Play className="w-8 h-8 text-primary-foreground fill-current" />
          </div>
        </div>
        
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-background/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg transform transition-all duration-500 group-hover:scale-110 border border-primary/20">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-bold text-foreground">{movie.vote_average.toFixed(1)}</span>
        </div>

        {/* Hover Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {movie.overview || "No description available"}
          </p>
        </div>
      </div>
      
      <div className="p-4 bg-gradient-to-b from-card to-card/80">
        <h3 className="font-bold text-sm line-clamp-1 group-hover:text-primary transition-colors duration-300 mb-1">
          {movie.title}
        </h3>
        <p className="text-xs text-muted-foreground">
          {movie.release_date?.split("-")[0] || "N/A"}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
