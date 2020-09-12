import React from 'react';
import MoviesList from "./MoviesList";
import Actions from "./Actions";
import Open from "./Open";
import MoviesListFilters from "./MoviesListFilters";
import {connect} from "react-redux";

export const HomePage = (props) => (
  <div className={String(props.language !== "English" && "align-right")}>
    <Open />
    <Actions />    
    <div className="movie-list-section">
    <MoviesListFilters />
    <MoviesList />
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  language: state.auth.language
});

export default connect(mapStateToProps)(HomePage);
