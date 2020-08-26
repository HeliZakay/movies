import React from "react";
import { connect } from "react-redux";
import MovieCard from "./MovieCard";
import getVisibleMovies from "../selectors/movies";

const MoviesList = (props) => {
    return (
        <div>
            <h1>Movies List</h1>
            {props.movies.map((movie) => 
            <MovieCard key={movie.id} {...movie}
            />)}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        movies: getVisibleMovies(state.movies, state.filters)
    };
};
export default connect(mapStateToProps)(MoviesList);


