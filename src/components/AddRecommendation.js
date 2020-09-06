import React from "react";
import RecommendationForm from "./RecommendationForm";
import {connect} from "react-redux";
import {startAddMovie} from "../actions/movies";

export class AddRecommendation extends React.Component {
   onSubmit = (movie) => {
      this.props.startAddMovie(movie);
      this.props.history.push("/homePage");
   };
   render() {
      return (
         <div>
         <div className="page-header">
         <div className="content-container--form">
            <h2>Add Recommendation</h2>
         </div>
            
         </div>
         <div className="content-container--form">
         <RecommendationForm 
           onSubmit={this.onSubmit}
          />
         </div>
         
         </div>
      );
   }
}


const mapDispatchToProps = (dispatch) => ({
   startAddMovie: (movie) => dispatch(startAddMovie(movie))
});
   
export default connect(undefined, mapDispatchToProps)(AddRecommendation);
