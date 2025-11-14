import { useRef, useEffect } from "react";
import MovieCard from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const MovieSection = ({ title, movies }) => {
  const scrollRef = useRef(null);
  const autoScrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -800 : 800;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Auto-scroll carousel
  useEffect(() => {
    const startAutoScroll = () => {
      autoScrollRef.current = setInterval(() => {
        if (scrollRef.current) {
          const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
          const currentScroll = scrollRef.current.scrollLeft;
          
          if (currentScroll >= maxScroll - 10) {
            scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
          }
        }
      }, 4000);
    };

    startAutoScroll();

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, []);

  const handleManualScroll = (direction) => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
    scroll(direction);
  };

  return (
    <section className="py-12 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-fade-in">
            {title}
          </h2>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleManualScroll("left")}
              className="rounded-full bg-card/50 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 border border-border"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleManualScroll("right")}
              className="rounded-full bg-card/50 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 border border-border"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {movies.map((movie, index) => (
            <div 
              key={movie.id} 
              className="flex-none w-56 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieSection;
