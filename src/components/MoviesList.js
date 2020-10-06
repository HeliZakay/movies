import React, {useState} from "react";
import { connect } from "react-redux";
import MovieCard from "./MovieCard";
import getVisibleMovies, {takeTop} from "../selectors/movies";


export const MoviesList = (props) => {
    const [moviesNum, setMoviesNum] = useState(21);
    const onMoreMovies = () => {
        setMoviesNum((prevVal) => prevVal + 18);
    }
    return (
       
         <div className="content-container">        
        {props.movies.length ===0 ?(props.language === "English"? <p>No movies yet that match your search- Add a recommendation</p>: <p>אין סרטים עדיין שעונים להגדרות החיפוש, הוסיפו סרט!</p>)
        :
        <div className="row">
         {takeTop(props.movies, moviesNum).map((movie) => 
         {
             return (
                    <div 
                    key={movie.id} 
                    className=" col-sm-12 col-md-6 col-lg-4">
                    <MovieCard 
                        className={props.language !== "English" && "align-right"}
                        reviews = {movie.reviews}
                        id={movie.id}
                        movieName={movie.movieName}
                        hname={movie.hname}
                        imdbData={movie.imdbData}
                        movie={movie}
                     />
                    </div>
             );
         })}
        </div>
        }
        <div className="more-movies-button-div">
        {moviesNum < props.movies.length && 
        <button
        className="btn btn-primary button--add-friend btn-lg button-more-movies" 
        onClick={onMoreMovies}>
        {props.language === "English"? "More Movies": "עוד סרטים"}
        </button>}
        </div>
        
    </div>
      
       
    );
};

const mapStateToProps = (state) => {
    return {
        movies: getVisibleMovies(state.movies, state.filters, state.auth.language),
        language: state.auth.language
    };
};
export default connect(mapStateToProps)(MoviesList);


