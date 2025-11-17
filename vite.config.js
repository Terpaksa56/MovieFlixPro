import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    // Optimize bundle size
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: mode === "production",
      },
    },
    // Code splitting untuk lazy-loaded routes
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-components': ['@radix-ui', 'lucide-react'],
          'forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
        },
      },
    },
    // CSS code splitting
    cssCodeSplit: true,
    // Chunking strategy
    chunkSizeWarningLimit: 500,
  },
}));
