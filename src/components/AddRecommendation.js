import React from "react";
import RecommendationForm from "./RecommendationForm";
import {connect} from "react-redux";
import {addMovie} from "../actions/movies";

 const AddRecommendation = (props) => (
        <div>
           <h1>Add Recommendation</h1>
           <RecommendationForm
             onSubmit={(movie) => {
                props.dispatch(addMovie(movie));
                props.history.push("/");
             }}
            />
        </div>
);

export default connect()(AddRecommendation);