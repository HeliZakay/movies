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
            <div className="page-header">
                <div className="content-container--form">
                <h2>Edit Recommendation</h2>
                </div>
                
            </div>
            <div className="content-container--form">
            <RecommendationForm
                 movie={this.props.movie}
                 onSubmit = {this.onSubmit}
                 />
                 <button className="button button--secondary" 
                    onClick={this.onRemove}
                    >
                    Remove</button>
            </div>
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



