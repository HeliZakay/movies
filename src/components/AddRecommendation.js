import React from "react";
import RecommendationForm from "./RecommendationForm";
import {connect} from "react-redux";
import {startAddMovie} from "../actions/movies";

export class AddRecommendation extends React.Component {
   onSubmit = (movie) => {
      this.props.startAddMovie(movie);
      this.props.history.push("/");
   };
   render() {
      return (
         <div>
         <h1>Add Recommendation</h1>
         <RecommendationForm
           onSubmit={this.onSubmit}
          />
         </div>
      );
   }
}


const mapDispatchToProps = (dispatch) => ({
   startAddMovie: (movie) => dispatch(startAddMovie(movie))
});
   
export default connect(undefined, mapDispatchToProps)(AddRecommendation);

// import React from 'react';
// import { connect } from 'react-redux';
// import RecommendationForm from './RecommendationForm';
// import { startAddMovie } from '../actions/movies';

// export class AddMovie extends React.Component {
//   onSubmit = (movie) => {
//     this.props.startAddMovie(movie);
//     this.props.history.push('/');
//   };
//   render() {
//     return (
//       <div>
//         <h1>Add Movie</h1>
//         <RecommendationForm
//           onSubmit={this.onSubmit}
//         />
//       </div>
//     );
//   }
// }

// const mapDispatchToProps = (dispatch) => ({
//   startAddMovie: (movie) => dispatch(startAddMovie(movie))
// });

// export default connect(undefined, mapDispatchToProps)(AddMovie);