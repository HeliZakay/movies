import React from "react";
import {connect} from "react-redux";
import RecommendationForm from "./RecommendationForm";
import {editMovie, removeMovie} from "../actions/movies";

const EditRecommendation = (props) => {
return (
    <div>
        <RecommendationForm
         movie={props.movie}
         onSubmit = { (movie) => {
             props.dispatch(editMovie(props.movie.id, movie));
             props.history.push("/");
         }}
         />
         <button 
            onClick={() => {
                props.dispatch(removeMovie({id: props.movie.id}));
                props.history.push("/");
            }}
            >
            Remove</button>
    </div>
)
};

const mapStateToProps = (state, props) => {
    return {
        movie: state.movies.find((movie) => movie.id === props.match.params.id)  
    };
};
export default connect(mapStateToProps)(EditRecommendation);