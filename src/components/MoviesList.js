import React from "react";
import { connect } from "react-redux";
import MovieCard from "./MovieCard";
import getVisibleMovies from "../selectors/movies";

export const MoviesList = (props) => {
    return (
       
         <div className="content-container">
        
        {props.movies.length ===0 ? <p>No movies yet- Add a recommendation</p>
        :
        <div className="row">
         {props.movies.map((movie) => 
         {
             const reviews = movie.reviews;
             const id = movie.id;
             const movieName = movie.movieName;
             const propsObj = {
                 reviews,
                 id,
                 movieName
             }
             return (
                    <div 
                    key={movie.id} 
                    className=" col-sm-12 col-md-6 col-lg-4">
                    <MovieCard 
                        className={props.language !== "English" && "align-right"}
                        {...propsObj}
                     />
                    </div>
             );
         })}
        </div>
        }
    </div>
      
       
    );
};

const mapStateToProps = (state) => {
    return {
        movies: getVisibleMovies(state.movies, state.filters),
        language: state.auth.language
    };
};
export default connect(mapStateToProps)(MoviesList);


