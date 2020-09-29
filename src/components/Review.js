import React, {useState} from 'react';
import {connect} from "react-redux";
import moment from "moment";
import Content from "./Content";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import IconButton from '@material-ui/core/IconButton';
import {startGiveStarToReview} from "../actions/movies";
import {didIGaveStarToReview} from "../selectors/movies";
import {startSendNotification} from "../actions/notifications";


export class Review extends React.Component {
    onStar = () => {
        this.props.startGiveStarToReview(this.props.id, this.props.movieId);
        this.props.startSendNotification({
            type: "getStar",
            personName: this.props.user.username,
            movieName: this.props.movieName,
            userId : this.props.userUid,
            createdAt: moment()
        });
    }
    render() {
        return (
            <div className="review">
            <p className="card-title">{this.props.language === "English"?("Recommender: "+ this.props.personName): ( this.props.personName +" ממליץ: ")}</p>
            <p className="card-title"> {this.props.language === "English"?("Score: "+ this.props.score): ("ציון: "+ this.props.score)}</p>
            <Content content={this.props.content}/> 
            {/* {this.props.stars.length > 0 && 
            <div className="review__stars-count-wrapper">
            <div className="review__count-div"> Review got {this.props.stars.length} </div>
            <div className="review__star-div"><span className="filled-star-icon material-icons">
            star
            </span></div>
            </div>} */}
            {/* {this.props.userUid !== this.props.uid && */}
            {!didIGaveStarToReview(this.props.stars, this.props.uid)&&
            <a onClick={this.onStar}>
            <div className="review__star-section">
            <div className="review__wrapper">
            <p className="review__star-text">      
            {this.props.language === "English"? "Give "+this.props.personName+" a star on their review":
            "תן ל"+ this.props.personName+ " כוכב על הביקורת "}
            </p>
            <span className="star-icon material-icons">
            star_border
            </span>   
            </div>
            </div>
           </a>}
            <p className="card-subtitle mb-2 text-muted">
            {this.props.language === "English"? ("Created At: " + moment(this.props.createdAt).format("MMMM D, YYYY")) : (" נוצר בתאריך: " +moment(this.props.createdAt).format("MMMM D, YYYY"))  }
            </p>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    language: state.auth.language,
    uid: state.auth.uid,
    user: state.auth
    
});
const mapDispatchToProps = (dispatch) => ({
    startGiveStarToReview: (reviewId, movieId) => dispatch(startGiveStarToReview(reviewId, movieId)),
    startSendNotification: (data) => dispatch(startSendNotification(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Review);
   




