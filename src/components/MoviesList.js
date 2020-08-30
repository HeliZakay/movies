import React from "react";
import { connect } from "react-redux";
import MovieCard from "./MovieCard";
import getVisibleMovies from "../selectors/movies";

export const MoviesList = (props) => {
    return (
        <div>
            {props.movies.length ===0 ? <p>No movies yet- Add a recommendation</p>
            : props.movies.map((movie) => 
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


