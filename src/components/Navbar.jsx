import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Film, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Film className="w-10 h-10 text-primary transition-all duration-500 group-hover:scale-125 group-hover:rotate-12" />
            <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-fade-in">
            MovieFlix Pro
          </span>
        </Link>

        {/* Desktop Search */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
            <Input
              type="text"
              placeholder="Search movies, actors, genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 h-12 bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary rounded-full transition-all duration-300 focus:shadow-lg focus:shadow-primary/20 text-base"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10 blur-xl" />
          </div>
        </form>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          <Link to="/">
            <Button 
              variant="ghost" 
              className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-semibold px-6"
            >
              Home
            </Button>
          </Link>
          <Link to="/trending" onMouseEnter={() => import("@/pages/Trending")}> 
            <Button 
              variant="ghost" 
              className="rounded-full hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 font-semibold px-6"
            >
              Trending
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden rounded-full"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/50 animate-fade-in">
          <div className="container mx-auto px-4 py-6 space-y-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-card/50 border-border/50 rounded-full"
                />
              </div>
            </form>
            <div className="flex flex-col gap-2">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start rounded-full hover:bg-primary hover:text-primary-foreground">
                  Home
                </Button>
              </Link>
              <Link to="/trending" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start rounded-full hover:bg-secondary hover:text-secondary-foreground">
                  Trending
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
