import React from "react";
import {connect} from "react-redux";
import RecommendationForm from "./RecommendationForm";
import {startEditMovie, startRemoveMovie} from "../actions/movies";

export class EditRecommendation extends React.Component {
   
    onSubmit = (movie) => {
        const updatedReview = {
            content: movie.content,
            score: movie.score,
            createdAt: movie.createdAt.format()
        } 
        
        const oldReview = this.props.movie.reviews.find((review) => review.userUid === this.props.uid);
        this.props.startEditMovie({
            movieId: this.props.movie.id,
            reviewId: oldReview.id,
            updatedReview
        });
        this.props.history.push("/homePage");
    };
    onRemove = () => {
        const oldReview = this.props.movie.reviews.find((review) => review.userUid === this.props.uid);
        this.props.startRemoveMovie({
            movieId: this.props.movie.id,
            reviewId: oldReview.id
        });
        this.props.history.push("/homePage");
    };
    render() {
        return (
            <div className={String(this.props.language !== "English" && "align-right")}>
            <div className="page-header">
                <div className="content-container--form">
                <h2 
                className="page-header__title">
                {this.props.language === "English"? "Edit Recommendation": "עריכת המלצת סרט"}
                </h2>
                </div>
                
            </div>
            <div className="content-container--form">
            <RecommendationForm
                 movie={this.props.movie}
                 review = {this.props.movie.reviews.find((review) => review.userUid === this.props.uid )}
                 onSubmit = {this.onSubmit}
                 />
                 <button className="button button--secondary" 
                    onClick={this.onRemove}
                    >
                    {this.props.language === "English"? "Remove": "הסר את הסרט"}
                    
                    </button>
            </div>
            </div>
                
        );
    }
};

const mapStateToProps = (state, props) => ({
    movie: state.movies.find((movie) => movie.id === props.match.params.id),
    language: state.auth.language,
    uid: state.auth.uid
});

const mapDispatchToProps = (dispatch) => ({
    startEditMovie: (data) => dispatch(startEditMovie(data)),
    startRemoveMovie: (data) => dispatch(startRemoveMovie(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(EditRecommendation);



