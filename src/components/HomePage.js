import React from 'react';
import MoviesList from "./MoviesList";
import Actions from "./Actions";
import Open from "./Open";
import ListHeading from "./ListHeading";
import MoviesListFilters from "./MoviesListFilters";

const HomePage = () => (
  <div>
    <Open />
    <Actions />
    <ListHeading />
    <hr/>
    <MoviesListFilters />
    <MoviesList />
  </div>
);

export default HomePage;
