import React, { useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

// const dummyMovies = [
//   {
//     id: 1,
//     title: "Some Dummy Movie",
//     openingText: "This is the opening text of the movie",
//     releaseDate: "2021-05-18",
//   },
//   {
//     id: 2,
//     title: "Some Dummy Movie 2",
//     openingText: "This is the second opening text of the movie",
//     releaseDate: "2021-05-19",
//   },
// ];
function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    // to clear any previous errors
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const transformedData = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          releaseDate: movieData.release_date,
          openingText: movieData.opening_crawl,
        };
      });
      setMovies(transformedData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {isLoading && <p>Loading...</p>}
        {!isLoading && !error && movies.length === 0 && <p>No movies found.</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
