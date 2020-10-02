import React from "react";
import {Link} from 'react-router-dom';
import moment from "moment";
import {startAddMovieToWatchList, startRemoveMovieFromWatchList} from "../actions/watchList";
import {startAddReview, startAddMovieGenre} from "../actions/movies";
import { connect } from "react-redux";
import {isMovieOnWatchList} from "../selectors/watchList";
import {startSendNotification} from "../actions/notifications";
import {getFriendsArray} from "../selectors/friends";
import ReviewsCarousel from "./ReviewsCarousel";
import MovieData from "./MovieData";
const https = require("https");

    
export class MovieCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            content: "",
            score: 7,
            show: false,
            movie: undefined
        }
    }
    produceImage = () => {
        const imgName = this.props.movieName.split(" ")[0].toLowerCase();  
        try {
            require(`../../public/images/${imgName}.jpg`); 
            return <img className="custom-card__movie-image" src={`images/${imgName}.jpg`}></img>;
        }     
        catch(err) {
            if (this.state.movie && !this.state.movie.Error) {
                return <img className="custom-card__movie-image" src={this.state.movie.Poster}></img>;
            }
        }
    }
    computeAverageScore = (reviews) => {
        let sum = 0;
        reviews.forEach((review) => {
            sum += Number(review.score);
        })
        const result = sum/reviews.length;
        return  Math.round(result*2)/2;;
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
            
            if (this.state.content) {
                this.props.myFriendsArr.forEach((friendId) => {
                    this.props.startSendNotification({
                        type: "newReview",
                        createdAt: moment(),
                        userId: friendId,
                        movieName: this.props.movieName,
                        personName: this.props.username
                    });
                });
            } 
    };
    didSendReviewToMovie = ({reviews, uid}) => {
        let reviewId;
        reviews.forEach((review) => {
          if (review.userUid === uid) {
            reviewId = review.id;
          }
        });
        return reviewId;
      }
    
      componentDidMount()  {  
        const url = `https://www.omdbapi.com/?apikey=d6a02fcc&t=${this.props.movieName}`;
         https.get(url, (response) => {
        response.on("data", (data) => {
            const movieData = JSON.parse(data);
            this.setState({movie: movieData});
        });
        });
        };

    render() {
        return (
            <div 
            className={"card rounded bg-light mb-3 custom-card" + String(this.props.dialog && "custom-card--dialog")}>
            <div className="card-header custom-card-header">
            <h3 >
                {this.props.language === "English"?
                ("Movie: " + this.props.movieName ): ( " סרט:    " +this.props.hname )}
            </h3>
            </div>
            <div className="movie-card">
            <div className="card-body">
            <div className="custom-card__card-content">
           {this.produceImage()}
            <MovieData 
            movieInfoImdb={this.state.movie}
            movieId = {this.props.id}
            movieName={this.props.movieName}
            averageScore= {this.computeAverageScore(this.props.reviews)}
            reviewsCount={this.props.reviews.length}
            />
            <ReviewsCarousel reviews={this.props.reviews} movieId={this.props.id} movieName={this.props.movieName}/>
            </div>
            <div className="card-footer text-muted custom-card__footer">   
            {this.didSendReviewToMovie({uid: this.props.uid, reviews: this.props.reviews})? (
                <div className="custom-card__edit-section">
                <p>{this.props.language === "English"? "You reviewd this movie!": "שלחת ביקורת לסרט! "}</p>
                <Link 
                className="edit-icon-link" 
                to={`/edit/${this.props.id}`}
                >
                <div className="custom-card__edit-section">
                <i className="material-icons">
                create
                </i>
                <p>
                {this.props.language === "English"? "edit": "לעריכה "}
                </p>
                </div> 
                </Link>
                </div>
            ):(
                <button
                onClick={this.onShow}
                className="btn button-movie btn-warning btn-lg" >
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
            {/* {!this.didSendReviewToMovie({uid: this.props.uid, reviews: this.props.reviews}) && */}
            <a onClick={this.onAddOrRemoveFromWatchList}>
            <div  >
            {(isMovieOnWatchList(this.props.watchList, this.props.id)) ?
            <div className="custom-card__add-to-watch-list">
            <i className="material-icons">
            remove_circle
            </i>
             {this.props.language === "English"?
             "Remove from my watchlist": "הסר מרשימת הצפייה שלי"}
             </div>:
             <div className="custom-card__add-to-watch-list">
             <i className="material-icons">
            add_circle
            </i>
              {this.props.language === "English"?"Add to my watchlist!": "הוסף לרשימת הצפייה שלי"}
             </div>
           }
           </div>
            </a>
            {/* } */}
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
    startAddReview: (review) => dispatch(startAddReview(review)),
    startAddMovieGenre: (genre) => dispatch(startAddMovieGenre(genre)),
    startSendNotification: (data)=> dispatch(startSendNotification(data))
 });

 const mapStateToProps = (state) => ({
     currentUserUid: state.auth.uid,
     watchList: state.watchList,
     language: state.auth.language,
     username: state.auth.username,
     uid: state.auth.uid,
     myFriendsArr: getFriendsArray(state.friends.friends)
 });

 export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);


