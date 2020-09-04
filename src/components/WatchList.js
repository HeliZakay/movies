import React from "react";
import { connect } from "react-redux";
import MovieCard from "./MovieCard";
import getVisibleMovies from "../selectors/movies";
import {getWatchListMovies} from "../selectors/watchList";
import MoviesListFilters from "./MoviesListFilters";


export const WatchList = (props) => {
    return (
        <div>
            <h2>My Watching List</h2>
            <MoviesListFilters />
            {props.movies.length ===0 ?
            (
                <p>No movies yet- Add movies to your watching list from homepage</p>
            ) : (
                props.movies.map((movie) => {
                    return (
                        <MovieCard key={movie.id} {...movie} /> 
                    );
                })
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        movies: getVisibleMovies(getWatchListMovies(state.movies, state.watchList), state.filters)
    };
};
export default connect(mapStateToProps)(WatchList);


