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
            </i>
             }
            
            <Review 
                content= {this.props.reviews[this.state.currentReview].content}
                createdAt= {this.props.reviews[this.state.currentReview].createdAt}
                personName= {this.props.reviews[this.state.currentReview].personName}
                score= {this.props.reviews[this.state.currentReview].score}
            /> 
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

   