import React from 'react';
import Review from "./Review"
import {connect} from "react-redux";

export class ReviewsCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            currentReview: 0
        }
    }
    onForward = () => {
        this.setState({
            currentReview:
             (this.state.currentReview + 1) % (this.props.reviews.length)
        })
    };
    onBackwards = () => {
        let newReview = this.state.currentReview - 1;
        if (newReview < 0) {
            newReview = this.props.reviews.length - 1;
        }
        this.setState({
            currentReview: newReview
        })
    };
    render() {
        return (
            <div className="reviews-carousel">
            {this.props.reviews.length > 1 && <div className="reviews-carousel__icon-wrapper">
            {this.props.language === "English"?
            <i 
            onClick={this.onBackwards}
            className="backwards material-icons">
            arrow_back_ios
            </i>:
            <i
            onClick={this.onForward}
            className="forward material-icons" >
            arrow_forward_ios
            </i>}
            </div>} 
           <div className= {this.props.reviews.length === 1? "review--one-review" : "review"}>
           <Review 
                movieId={this.props.movieId}
                id= {this.props.reviews[this.state.currentReview].id}
                movieName={this.props.movieName}
                stars = {this.props.reviews[this.state.currentReview].stars}
                content= {this.props.reviews[this.state.currentReview].content}
                createdAt= {this.props.reviews[this.state.currentReview].createdAt}
                personName= {this.props.reviews[this.state.currentReview].personName}
                score= {this.props.reviews[this.state.currentReview].score}
                userUid= {this.props.reviews[this.state.currentReview].userUid}
                username={this.props.reviews[this.state.currentReview].personName}
            /> 
           </div>
           
            {this.props.reviews.length > 1 && <div className="reviews-carousel__icon-wrapper">
            {this.props.language === "English"?
            <i
            onClick={this.onForward}
            className="forward material-icons" >
            arrow_forward_ios
            </i>:
            <i 
            onClick={this.onBackwards}
            className="backwards material-icons">
            arrow_back_ios
            </i>}
            </div>}
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    language: state.auth.language
});
export default connect(mapStateToProps)(ReviewsCarousel);

   