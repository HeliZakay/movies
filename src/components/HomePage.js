import React from 'react';
import MoviesList from "./MoviesList";
import MoviesListFilters from "./MoviesListFilters";

const HomePage = () => (
  <div>
    <h2>Movies recommended by friends</h2>
    <p>Take a look at your friends' recommendations!</p>
    <hr/>
    <MoviesListFilters />
    <MoviesList />
  </div>
);

export default HomePage;
