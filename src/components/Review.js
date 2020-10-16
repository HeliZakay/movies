import React, {useState} from 'react';
import {connect} from "react-redux";
import moment from "moment";
import Content from "./Content";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import IconButton from '@material-ui/core/IconButton';
import {startGiveStarToReview} from "../actions/movies";
import {didIGaveStarToReview} from "../selectors/movies";
import {startSendNotification} from "../actions/notifications";
import {getFriendsArray} from "../selectors/friends"

export class Review extends React.Component {
    onStar = () => {
        this.props.startGiveStarToReview(this.props.id, this.props.movieId);
        if (this.props.myFriends.includes(this.props.userUid)) {
            
            this.props.startSendNotification({
                type: "getStar",
                personName: this.props.user.username,
                movieName: this.props.movieName,
                userId : this.props.userUid,
                createdAt: moment()
            });
        }
    }
    render() {
        return (
            <div className="review">
            <p className="card-title">{this.props.language === "English"?("Recommender: "+ this.props.personName): ( this.props.personName +" ממליץ: ")}</p>
            <p className="card-title"> {this.props.language === "English"?("Score: "+ this.props.score): ("ציון: "+ this.props.score)}</p>
            <Content content={this.props.content}/> 
            {/* {   this.props.language === "English" &&
                this.props.stars && this.props.stars.length > 0 &&
                <p>
                <span>({this.props.stars.length}</span>
                <span>{this.props.stars.length === 1? " person ": " people "}</span> 
                <span>gave a star to the review)</span>
                </p>
            } 
            {   this.props.language !== "English" &&
                this.props.stars && this.props.stars.length > 0 &&
                <p>
                <span>({this.props.stars.length}</span>
                <span>{this.props.stars.length === 1? " אדם ": " אנשים "}</span> 
                <span>{this.props.stars.length === 1? " נתן ": " נתנו "}</span> 
                <span> כוכב לביקורת)</span>
                </p>
            }  */}
           <div className="review__flex-div">
           
           <div className="review__paragraph-div">
           <p className="card-subtitle mb-2 text-muted">
            {this.props.language === "English"? ("Created At: " + moment(this.props.createdAt).format("MMMM D, YYYY")) : (" נוצר בתאריך: " +moment(this.props.createdAt).format("MMMM D, YYYY"))  }
            </p>
           </div>
            <div className="review__flex-div">
            {this.props.stars && this.props.stars.length > 0 && 
            <p>{this.props.stars.length}</p>
           }
            {!didIGaveStarToReview(this.props.stars, this.props.uid) ? 
            <a onClick={this.onStar}>
            <span className="star-icon material-icons">
            star_border
            </span>
            </a>
            :
            <span className="material-icons">
            star
            </span>
            }
            </div>
           </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    language: state.auth.language,
    uid: state.auth.uid,
    user: state.auth,
    myFriends: getFriendsArray(state.friends.friends)
    
});
const mapDispatchToProps = (dispatch) => ({
    startGiveStarToReview: (reviewId, movieId) => dispatch(startGiveStarToReview(reviewId, movieId)),
    startSendNotification: (data) => dispatch(startSendNotification(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Review);
   




