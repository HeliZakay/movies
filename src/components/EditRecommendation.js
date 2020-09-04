import React from "react";
import {connect} from "react-redux";
import RecommendationForm from "./RecommendationForm";
import {startEditMovie, startRemoveMovie} from "../actions/movies";

export class EditRecommendation extends React.Component {
   
    onSubmit = (movie) => {
        this.props.startEditMovie(this.props.movie.id, movie);
        this.props.history.push("/homePage");
    };
    onRemove = () => {
        this.props.startRemoveMovie({id: this.props.movie.id});
        this.props.history.push("/homePage");
    };
    render() {
        return (
            <div>
                <RecommendationForm
                 movie={this.props.movie}
                 onSubmit = {this.onSubmit}
                 />
                 <button 
                    onClick={this.onRemove}
                    >
                    Remove</button>
            </div>
        );
    }
};

const mapStateToProps = (state, props) => ({
    movie: state.movies.find((movie) => movie.id === props.match.params.id)  
});

const mapDispatchToProps = (dispatch) => ({
    startEditMovie: (id, movie) => dispatch(startEditMovie(id, movie)),
    startRemoveMovie: (data) => dispatch(startRemoveMovie(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(EditRecommendation);



