import React from "react";
import moment from "moment";
import {connect} from "react-redux";
const https = require("https");

export class RecommendationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieName: props.movie ? props.movie.movieName : "",
            hname: props.movie ? props.movie.hname : "",
            personName:props.review ? props.review.personName : props.username,
            content: props.review? props.review.content: "",
            score: props.review? props.review.score: 7,
            error:"",
            createdAt: moment(),
            imdbMovie: props.movie ? props.movie.imdbData : {}      
        }
    }
    

    onMovieNameChange =(event) => {
            const movieName = event.target.value;
            this.setState( () => ({movieName}));
            const url = `https://www.omdbapi.com/?apikey=d6a02fcc&t=${movieName}`;
            https.get(url, (response) => {
            response.on("data", (data) => {
            const movieData = JSON.parse(data);
            this.setState({imdbMovie: movieData});
        });
        });
            
    };
    onhnameChange =(event) => {
            const hname = event.target.value;
            this.setState( () => ({hname}));
    };
    onPersonNameChange =(event) => {
        if (!this.props.review) {
            const personName = event.target.value;
            this.setState( () => ({personName}));
        }
    };
    onContentChange = (event) => {
        const content = event.target.value;
        this.setState( () => ({content}));
    }
    onScoreChange = (event) => {
        const score = event.target.value;
        this.setState( () => ({score}));
    }
    onSubmit = (event) => {

        event.preventDefault();
        if (!this.state.movieName || !this.state.score) {
            this.setState( () => ({error: this.props.language === "English"? "Please fill in movie name and a movie rating": "נא להכניס שם סרט" }));
        } else {
            this.setState( () => ({error: ""}));
            this.props.onSubmit({
                movieName: (this.state.imdbMovie && !this.state.imdbMovie.Error)?
                this.state.imdbMovie.Title: this.state.movieName ,
                hname: this.state.hname,
                score: parseInt(this.state.score),
                createdAt: this.state.createdAt,
                personName: this.state.personName,
                content: this.state.content,
                imdbData: this.state.imdbMovie
            });
        }
    };
    onImgClick = () => {
        this.setState({movieName: this.state.imdbMovie.Title || this.state.movieName});
    }

    render() {
        return (
                <form className="form" onSubmit={this.onSubmit}>
                    {this.state.error && <p className="form__message"><em>{this.state.error}</em></p>}    
                    <input className="text-input"
                        type="text"
                        placeholder={this.props.language === "English"? "Movie Name": "שם הסרט באנגלית" }
                        autoFocus
                        value = {this.state.movieName}
                        onChange= {this.onMovieNameChange}
                    />
                    {this.props.language !== "English" && <input
                        className="text-input"
                        type="text"
                        placeholder="שם הסרט בעברית"
                        value = {this.state.hname}
                        onChange= {this.onhnameChange}/>
                    }
                    {this.state.imdbMovie && 
                    <a onClick={this.onImgClick}>
                    <div className="form__img-div"><img className= "form__image" src={this.state.imdbMovie.Poster}></img></div>
                    </a>}
                    <label> {this.props.language === "English"? "Movie Rating:": "ציון הסרט" } </label>
                     <input 
                        type="number"                        
                        value={this.state.score}
                        onChange={this.onScoreChange}
                        min="1"
                        max="10"
                    />
                    
                    <textarea className="textarea"
                        placeholder={this.props.language === "English"? "Write your review for the movie (optional)": " (כתבו ביקורת על הסרט (אופציונאלי" }
                        value={this.state.content}
                        onChange={this.onContentChange}>
                    </textarea>
                    
                    <label> {this.props.language === "English"? "Your Name: ": "השם שלך:"} </label>
                    <input 
                        type="text"     
                        placeholder={this.props.language === "English"? "Your name (optional)"  : "השם שלך" }                  
                        value={this.state.personName}
                        onChange={this.onPersonNameChange}
                    />
                    
                    <div>
                        <button  className="btn button-movie btn-warning btn-lg">
                        <strong>
                        {this.props.language === "English"? " Recommend!" : "המלץ!"}
                       
                        </strong>
                        </button>
                    </div>
                    
                </form>
            
        );
    }
}
const mapStateToProps = (state) => ({
    username: state.auth.username,
    uid: state.auth.uid,
    language: state.auth.language
});
export default connect(mapStateToProps)(RecommendationForm);