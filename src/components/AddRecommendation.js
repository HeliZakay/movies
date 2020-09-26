import React from "react";
import RecommendationForm from "./RecommendationForm";
import {connect} from "react-redux";
import {startAddMovie, startAddReview} from "../actions/movies";
import {isMovieNameExistsAlready} from "../selectors/movies";
const https = require("https");


export class AddRecommendation extends React.Component {
   onSubmit = (movie) => {
      const movieId = isMovieNameExistsAlready(movie.movieName, this.props.movies);
      if (movieId) {
         this.props.startAddReview({movieId, ...movie});
      } else {
         const url = `https://www.omdbapi.com/?apikey=d6a02fcc&t=${movie.movieName}`;
         https.get(url, (response) => {
        response.on("data", (data) => {
            const movieData = JSON.parse(data);
            let genres;
            if(!movieData.Error) {
               genres = movieData.Genre;
            }
            this.props.startAddMovie({...movie, genres});
        });
        });
      }
      this.props.history.push("/homePage");
   };
   render() {
      return (
         <div className="page">
         <div className={String(this.props.language !== "English" && "align-right")}>
         {/* <div className="page-header" >
         <div className="content-container--form">
            <h2 className="page-header__title">
            {this.props.language === "English"? "Add Recommendation" : "הוספת המלצה על סרט"}</h2>
         </div> */}
         
         <div className="add-or-edit">
         <div className="content-container--form">
         <RecommendationForm 
           onSubmit={this.onSubmit}
          />
         </div>
         </div>
         </div>
         </div>
      );
   }
}


const mapDispatchToProps = (dispatch) => ({
   startAddMovie: (movie) => dispatch(startAddMovie(movie)),
   startAddReview: (review) => dispatch(startAddReview(review))
});

const mapStateToProps = (state) => ({
   language: state.auth.language,
   movies: state.movies
});
   
export default connect(mapStateToProps, mapDispatchToProps)(AddRecommendation);
