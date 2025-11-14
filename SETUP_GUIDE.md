# CineVault - Movie Discovery App

Aplikasi modern untuk discover, search, dan explore informasi film dengan UI yang cantik dan responsif.

## 🚀 Teknologi

- **Frontend**: React 18 dengan Vite
- **Styling**: Tailwind CSS + Shadcn/ui Components
- **Routing**: React Router v6
- **API**: OMDB API (Open Movie Database)
- **Build Tool**: Vite 5.4

## 📋 Requirements

- Node.js 16+
- npm atau yarn

## 🔧 Setup & Installation

### 1. Clone Repository
```bash
git clone <repository-url>
cd cinestream-navigator-main
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup API Key

#### OMDB API Key
1. Kunjungi: https://www.omdbapi.com/apikey.aspx
2. Pilih plan (Free atau Paid)
3. Copy API Key yang diberikan
4. Buat file `.env` di root project:
```env
VITE_OMDB_API_KEY=your_api_key_here
```

### 4. Development Server
```bash
npm run dev
```
App akan tersedia di: http://localhost:8080

### 5. Production Build
```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Shadcn UI components (39 komponen)
│   ├── Navbar.jsx      # Navigation bar
│   ├── Hero.jsx        # Hero section
│   ├── MovieCard.jsx   # Movie card component
│   └── ...
├── pages/              # Page components
│   ├── Home.jsx        # Home page
│   ├── SearchResults.jsx
│   ├── MovieDetails.jsx
│   ├── Trending.jsx
│   └── ...
├── services/           # API services
│   └── tmdb.js        # OMDB API wrapper
├── hooks/              # React hooks
│   ├── use-toast.js
│   └── use-mobile.jsx
├── lib/                # Utilities
│   └── utils.js
├── App.jsx             # Main App component
└── main.jsx            # Entry point
```

## ✨ Features

- 🎬 Tampilkan film trending dan populer
- 🔍 Search films dengan keyword
- 📺 Detail film lengkap dengan rating dan genre
- 🎨 UI modern dan responsif
- ⚡ Fast loading dengan Vite
- 🎭 12+ UI components dari Shadcn/ui

## 🛠️ Available Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

## 🔌 API Integration

### OMDB API Endpoints Used:
- **Search**: `/?s=query` - Search movies
- **Details**: `/?i=imdbID` - Get movie details
- **Trending**: Hardcoded list of popular IMDb IDs
- **Popular**: Hardcoded list of classic movies

### Response Mapping:
OMDB response ditransform untuk match component structure:
```javascript
{
  id: imdbID,
  title: Title,
  overview: Plot,
  poster_path: Poster,
  vote_average: imdbRating,
  release_date: Year,
  genres: Genre (split by comma),
  runtime: Runtime,
}
```

## 🎯 Troubleshooting

### API Error 401 (Unauthorized)
- Check your OMDB API key di `.env`
- Verify API key masih valid

### Movies tidak tampil
- Check browser console untuk error messages
- Pastikan internet connection aktif
- Verify `.env` file sudah dikonfigurasi

### Build Error
```bash
# Clean dan reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📦 Dependencies

### Main Dependencies:
- react: 18.3.1
- react-dom: 18.3.1
- react-router-dom: 6.30.1
- @radix-ui/*: UI component libraries
- lucide-react: Icons
- tailwindcss: Styling
- shadcn/ui: Component library

### Dev Dependencies:
- vite: Build tool
- typescript: Type checking
- eslint: Code linting
- tailwindcss-animate: Animation utilities

## 🌟 Recent Updates

### Conversion dari TypeScript ke JavaScript (JSX)
- ✅ Konversi semua `.tsx` files ke `.jsx`
- ✅ Konversi `vite.config.ts` ke `vite.config.js`
- ✅ Konversi `tailwind.config.ts` ke `tailwind.config.js`
- ✅ Update TypeScript config untuk JSX support
- ✅ Migrasi dari TMDB API ke OMDB API

### Perbaikan Error Handling
- ✅ React Router future flags v7_startTransition & v7_relativeSplatPath
- ✅ Comprehensive error handling di API calls
- ✅ Safe null/undefined checks di components

## 📝 License

MIT

## 👤 Author

CineVault Development Team
