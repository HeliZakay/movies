import React from 'react';
import { Link } from 'react-router-dom';
import MoviesList from "./MoviesList";
import MoviesListFilters from "./MoviesListFilters";

const HomePage = () => (
  <div>
    <h1>Movies recommended by friends</h1>
    <p>Take a look at your friends' recommendations!</p>
    <hr/>
    <MoviesListFilters />
    <MoviesList />
  </div>
);

export default HomePage;
