import React from "react";
import { connect } from "react-redux";
import MovieCard from "./MovieCard";
import getVisibleMovies from "../selectors/movies";
import {getWatchListMovies} from "../selectors/watchList";
import MoviesListFilters from "./MoviesListFilters";


export const WatchList = (props) => {
    return (
        <div>
        <div className="page-header">
        <div className="content-container">
        <h2 className="page-header__title">My Watch List</h2>
        </div>
         
        </div>
        <div className="content-container">
        <MoviesListFilters />
            {props.movies.length ===0 ?
            (
                
                <p className="friends__error"><em>Add movies to your watch list from homepage!</em></p>
               
            ) : (
                props.movies.map((movie) => {
                    return (
                        <MovieCard key={movie.id} {...movie} /> 
                    );
                })
            )}
        
            
           
        </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        movies: getVisibleMovies(getWatchListMovies(state.movies, state.watchList), state.filters)
    };
};
export default connect(mapStateToProps)(WatchList);


