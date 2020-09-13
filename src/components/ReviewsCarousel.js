import React from 'react';
import {connect} from "react-redux";
import Review from "./Review"

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
        const review = this.props.reviews[this.state.currentReview];
        const propsObj = {
            content: review.content,
            createdAt: review.createdAt,
            personName: review.personName,
            score: review.score
        }
        return (
            <div className="reviews-carousel">
            {this.props.reviews.length > 1 && 
             <i 
            onClick={this.onBackwards}
            className="backwards material-icons">
            arrow_back_ios
            </i>}
            <Review {...propsObj}/> 
            {this.props.reviews.length > 1 && 
            <i 
            onClick={this.onForward}
            className="forward material-icons">
            arrow_forward_ios
            </i>
            }
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    language: state.auth.language
});

export default connect(mapStateToProps)(ReviewsCarousel);
   