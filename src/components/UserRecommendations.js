import React from 'react';
import getUserRecommendations from "../selectors/userRecommendations";
import {connect} from "react-redux";
import {getMovieById} from "../selectors/movies";
import {filterOnlyMoviesNotRecommendedYet} from "../selectors/userRecommendations";

export class UserRecommendations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            movieChosenId: undefined,
            content: "" 
        }
    }
    onCheck = (event) => {
        const movieChosenId = event.currentTarget.value;
        this.setState({...this.state, movieChosenId});
    };
    onContentChange = (event) => {
        const content = event.target.value;
        this.setState( () => ({...this.state, content}));
    };
    render() {
        return (
            <div className="user-recommendations">
        
        {this.props.getOptionalMovies(this.props.friend).length ===0 ? 
        
        <p>{this.props.language === "English"?
        "Recommend a movie through homepage first, there are no new movies to recommend to "+ this.props.friend.username:
        "קודם המליצו על סרט דרך דף הבית בכפתור של המלץ על סרט"
         }
        
        </p>:
        (<div>
        <h3>
        {this.props.language === "English"?
         "Which of your recommendations do you think "+this.props.friend.username+ " would like?":"?יאהב " +this.props.friend.username+" איזה מבין הסרטים הבאים "
         
         }
        
        </h3>
        {this.props.getOptionalMovies(this.props.friend).map((movie) => {
             return (
                 <div key={movie.id}>
                 <input 
                 id={movie.id}
                 name="movie-selection"
                 onChange={this.onCheck} 
                 value={movie.id} 
                 type="radio">
                  </input>
                  <label htmlFor={movie.id}>{movie.movieName}</label>
                 </div>
                 
             ); 
         })}
         <textarea className="textarea--message-friend"
                        placeholder=
                        {this.props.language === "English"? "If you'd like you may add a personal note":
                        "אם אתם רוצים אפשר גם להוסיף הודעה אישית"}
                        value={this.state.content}
                        onChange={this.onContentChange}>
        </textarea>
         <button  
         onClick={() => this.props.onRecommendationSend(
             getMovieById(
                 this.props.movies, this.state.movieChosenId), this.state.content)} 
         className="btn btn-primary button--add-friend btn-lg">
         {this.props.language === "English"? ("Recommend to "+this.props.friend.username):
         (this.props.friend.username+"המליצו ל")
         }
         </button> "
         
        </div>)}
     </div>
        )};
}

const mapStateToProps = (state) => ({
    movies: getUserRecommendations(state.movies, state.auth.uid),
    getOptionalMovies: (friend)=> {return filterOnlyMoviesNotRecommendedYet({
        moviesToFilterFrom:   getUserRecommendations(state.movies, state.auth.uid),
        messagesSent:  state.messages.messagesSent,
        friend
    })},
    language: state.auth.language
});

export default connect(mapStateToProps)(UserRecommendations);
   




