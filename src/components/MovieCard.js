import React from "react";
import {Link} from 'react-router-dom';
import moment from "moment";
import {startAddMovieToWatchList, startRemoveMovieFromWatchList} from "../actions/watchList";
import {startAddReview} from "../actions/movies";
import { connect } from "react-redux";
import {isMovieOnWatchList} from "../selectors/watchList";
import ReviewsCarousel from "./ReviewsCarousel";

export class MovieCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            content: "",
            score: 7,
            show: false
        }
    }
    onShow = () => {
        this.setState(() => ({...this.state, show: !this.state.show}))
    }
    onScoreChange = (event) => {
        const score = event.target.value;
        this.setState( () => ({...this.state, score}));
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
    onQuickReviewSend = () => {
        if (this.state.content) {
            this.setState({...this.state, show: false, content: ""});
            const review = {
                movieId: this.props.id,
                score: this.state.score,
                personName: this.props.username,
                content: this.state.content,
                createdAt: moment() 
            };
            this.props.startAddReview(review);
        }
       
    };
    render() {
        const propsItem = {
            reviews: this.props.reviews
        }
        return (
            <div className="card card bg-light mb-3 custom-card">
            {/* {this.props.userUid === this.props.currentUserUid ? (
                <Link to={`/edit/${this.props.id}`}>
                <h3 
                className="card-header custom-card-header">
                {this.props.language === "English"?
                ("Movie: " + this.props.movieName ): (  this.props.movieName  )}
                </h3>
                </Link>
            ): (
                <h3 className="card-header custom-card-header">
                {this.props.language === "English"?
                ("Movie: " + this.props.movieName ): (  this.props.movieName )}
                </h3>
            )} */}
            <h3 className="card-header custom-card-header">
                {this.props.language === "English"?
                ("Movie: " + this.props.movieName ): (  this.props.movieName )}
            </h3>
            <div className="card-body">
            <div className="custom-card__card-content">
            <ReviewsCarousel {...propsItem}/>
            </div>
            <div className="card-footer text-muted">           
           <button
           onClick={this.onShow}
            className="btn button-movie btn-warning btn-lg" >
           <div className="custom-card__add-review-text">
            </div>
           {(this.props.language === "English"? "Add a quick review!": " !הוסף המלצה זריזה")}
           </button>
            
            {this.state.show && <div className="custom-card__quick-review-section">
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
                onClick={this.onQuickReviewSend} 
                className="btn button-friend--message btn-primary btn-lg">
                        <strong>
                        {this.props.language === "English"? " Send!" : "!שלח"}
                        </strong>
                        </button>

            </div>}
            <a onClick={this.onAddOrRemoveFromWatchList}>
            <div  >
            {(isMovieOnWatchList(this.props.watchList, this.props.id)) ?
            <div className="custom-card__add-to-watch-list">
            <i className="material-icons">
            remove_circle
            </i>
             {this.props.language === "English"?
             "Remove from my watch list": "הסר מרשימת הצפייה שלי"}
             </div>:
             <div className="custom-card__add-to-watch-list">
             <i className="material-icons">
            add_circle
            </i>
              {this.props.language === "English"?"Add to my watch list!": "הוסף לרשימת הצפייה שלי"}
             </div>
           }
           </div>
            </a>
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
     username: state.auth.username
 });

 export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);


