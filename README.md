# MovieFlixPro - Movie Discovery Application

A modern movie discovery application built with React, Vite, and OMDB API.

## Project Info

**Name**: MovieFlixPro
**Type**: Movie Discovery Web Application
**Status**: Production Ready

## Features

- Browse trending and popular movies
- Search movies by title
- View detailed movie information with ratings and genres
- Beautiful, responsive UI with dark theme
- Fast performance with Vite build tool
- Real-time data from OMDB API

## How to Get Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation Steps

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd cinestream-navigator-main

# Step 3: Install dependencies
npm install

# Step 4: Setup OMDB API Key
# Create a .env file in the root directory
echo "VITE_OMDB_API_KEY=ba76f17d" > .env

# Step 5: Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Build for Production

```sh
npm run build
npm run preview
```

## Technologies Used

This project is built with:

- **Vite** - Fast build tool
- **React 18** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling framework
- **Shadcn/ui** - Component library (39+ components)
- **OMDB API** - Movie data source
- **Lucide Icons** - Icon library

## Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Shadcn UI components
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── MovieCard.jsx
│   └── ...
├── pages/               # Page components
│   ├── Home.jsx
│   ├── SearchResults.jsx
│   ├── MovieDetails.jsx
│   └── ...
├── services/            # API services
│   └── tmdb.js
├── hooks/               # React hooks
├── lib/                 # Utility functions
├── App.jsx
└── main.jsx
```

## API Configuration

This project uses OMDB API. To use your own API key:

1. Go to https://www.omdbapi.com/apikey.aspx
2. Get your API key
3. Create `.env` file with: `VITE_OMDB_API_KEY=your_key_here`

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Development Notes

- The project has been converted from TypeScript to JavaScript (JSX)
- All TypeScript files have been converted to JSX format
- React Router future flags are enabled for v7 compatibility
- Comprehensive error handling for API calls

## License

MIT

## Support

For issues and questions, please check the documentation or create an issue in the repository.
