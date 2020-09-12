import React from "react";
import { connect } from "react-redux";
import MovieCard from "./MovieCard";
import getVisibleMovies from "../selectors/movies";
import {getWatchListMovies} from "../selectors/watchList";
import MoviesListFilters from "./MoviesListFilters";


export const WatchList = (props) => {
    return (
        <div className={String(props.language !== "English" && "align-right")}>
        <div className="page-header">
        <div className="content-container">
        <h2 className="page-header__title">
        {props.language === "English"? "My Watch List": "רשימת הצפייה שלי"}
        </h2>
        </div>
         
        </div>
        <div className="content-container">
        <MoviesListFilters />
            {props.movies.length ===0 ?
            (
                
                <p className="friends__error"><em>
                {props.language === "English"? "Add movies to your watch list from homepage!":
                 ".הוסיפו סרטים לרשימת הצפייה דרך עמוד הבית בכפתור של הוספה לרשימת הצפייה"}
                </em></p>
               
            ) : (
                <div className="row">
               
                {props.movies.map((movie) => {
                    return (
                        <div 
                        key={movie.id} 
                        className=" col-sm-12 col-md-6 col-lg-4">
                        <MovieCard  {...movie} /> 
                        </div>
                    );
                })}
                </div>
            )}
        
            
           
        </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        movies: getVisibleMovies(getWatchListMovies(state.movies, state.watchList), state.filters),
        language: state.auth.language
    };
};
export default connect(mapStateToProps)(WatchList);


