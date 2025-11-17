import { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Layout from "./pages/Layout";

// Skeleton fallback component untuk faster perceived performance
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

// Lazy-loaded pages to reduce initial JS bundle
const Home = lazy(() => import("./pages/Home"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const Trending = lazy(() => import("./pages/Trending"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  useEffect(() => {
    // Apply dark mode
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<SearchResults />} />
            <Route path="movie/:id" element={<MovieDetails />} />
            <Route path="trending" element={<Trending />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
    </Router>
  );
}

export default App;
