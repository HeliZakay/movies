import React from "react";
import {Link} from 'react-router-dom';
import moment from "moment";
import {startAddMovieToWatchList, startRemoveMovieFromWatchList} from "../actions/watchList";
import {startAddReview} from "../actions/movies";
import { connect } from "react-redux";
import {isMovieOnWatchList} from "../selectors/watchList";
import Review from "./Review";


export class MovieCardCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            content: "",
            show: false
        }
    }
    onShow = () => {
        this.setState(() => ({...this.state, show: !this.state.show}))
    }
    
    onContentChange = (event) => {
        const content = event.target.value;
        this.setState( () => ({...this.state, content}));
    };
    onAddOrRemoveFromWatchList = () => {
        (isMovieOnWatchList(this.props.watchList, this.props.id))? 
        this.props.startRemoveMovieFromWatchList(this.props.id):
        this.props.startAddMovieToWatchList(this.props.id);
    };
    onQuickReviewSend = (event) => {
        event.preventDefault();
            this.setState({...this.state, show: false, content: ""});
            const review = {
                movieId: this.props.id,
                score: this.state.score,
                personName: this.props.username,
                content: this.state.content,
                createdAt: moment() 
            };
            this.props.startAddReview(review);
            
    };
    didSendReviewToMovie = ({review, uid}) => {
        let reviewId;
        if (review.userUid === uid) {
            reviewId = review.id;
        }
        return reviewId;
      }
    render() {
        return (
            <div className="movie-card-carousel">
            <div className="movie-card-carousel__inner">
            {this.props.language === "English"? (
                <h1 className=" margin-bottom">{this.props.review.personName} reviewed the movie {this.props.movieName}:</h1>
            ) : (
                <h1 className="margin-bottom">{this.props.review.personName} שלחו המלצה על הסרט {this.props.movieName}</h1>
            ) }
           {this.props.review.content && <p className="large-font">  "{this.props.review.content}" </p> }
            <p className="large-font margin-bottom"> {this.props.language === "English"?("Score: "+ this.props.review.score): ("ציון: "+ this.props.review.score)}</p>
            <div className="middle" >   
            {!this.didSendReviewToMovie({uid: this.props.uid, review: this.props.review})&&
            (
                <button 
                onClick={this.onShow}
                className="btn button-movie btn-warning btn-lg margin-bottom " >
                <div className="custom-card__add-review-text">
                {(this.props.language === "English"? "Add a quick review!": " הוסף המלצה זריזה! ")}
                 </div>
                </button>
            )}                    
            {this.state.show && <div className="custom-card__quick-review-section">
            <form onSubmit={this.onQuickReviewSend}>
            <label> {this.props.language === "English"? "Movie Rating:": "ציון הסרט" } </label>
                     <input 
                        type="number"                        
                        value={this.state.score}
                        onChange={this.onScoreChange}
                        min="1"
                        max="10"
                    />
                <textarea className="textarea--quick-review"
                        placeholder={this.props.language === "English"? "Write your review for the movie (optional)": " (כתבו ביקורת על הסרט (אופציונאלי" }
                        value={this.state.content}
                        onChange={this.onContentChange}>
                
                </textarea>
                <br/>
                <button 
                type="submit" 
                className="btn button-friend--message btn-primary btn-lg">
                        <strong>
                        {this.props.language === "English"? " Send!" : "!שלח"}
                        </strong>
                </button>
            </form>
            </div>}
            <div  className="middle">
            <a onClick={this.onAddOrRemoveFromWatchList}>
            {(!isMovieOnWatchList(this.props.watchList, this.props.id)) &&
           
             <div className="middle">
             <div className=" movie-card-carousel__wrapper-watchlist-button">
             <div className="another">
             <i className="material-icons">
            add_circle
            </i>
             <p >
             {this.props.language === "English"?"Add to my watch list!": "הוסף לרשימת הצפייה שלי"}
             </p> 
             </div>
             </div>
             </div>
           }
            </a>
            </div>
            </div> 
            </div>           
            </div>
        );
    };
};


const mapDispatchToProps = (dispatch) => ({
    startAddMovieToWatchList: (id) => dispatch(startAddMovieToWatchList(id)),
    startRemoveMovieFromWatchList: (id) => dispatch(startRemoveMovieFromWatchList(id)),
    startAddReview: (review) => dispatch(startAddReview(review))
 });

 const mapStateToProps = (state) => ({
     currentUserUid: state.auth.uid,
     watchList: state.watchList,
     language: state.auth.language,
     username: state.auth.username,
     uid: state.auth.uid
 });

 export default connect(mapStateToProps, mapDispatchToProps)(MovieCardCarousel);


