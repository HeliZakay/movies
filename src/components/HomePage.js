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
    
    <div className="movie-list-section">
    
    <MoviesListFilters />
    <MoviesList />
    </div>
   
  </div>
);

export default HomePage;
