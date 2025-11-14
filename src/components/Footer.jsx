import { Link } from "react-router-dom";
import { Film, Github, Twitter, Instagram, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card/30 backdrop-blur-sm border-t border-border/50 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <Film className="w-8 h-8 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                CineVault
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your premium destination for discovering and exploring movies. Dive into the world of cinema.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/trending" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                  Trending
                </Link>
              </li>
              <li>
                <Link to="/search?q=popular" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                  Popular Movies
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/search?q=action" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                  Action
                </Link>
              </li>
              <li>
                <Link to="/search?q=comedy" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                  Comedy
                </Link>
              </li>
              <li>
                <Link to="/search?q=drama" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                  Drama
                </Link>
              </li>
              <li>
                <Link to="/search?q=thriller" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                  Thriller
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:scale-110 transition-all duration-300 group"
              >
                <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors duration-300" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:scale-110 transition-all duration-300 group"
              >
                <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors duration-300" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:scale-110 transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors duration-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} CineVault. All rights reserved. Data provided by TMDB.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" /> for movie lovers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
