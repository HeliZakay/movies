import React from "react";
import moment from "moment";
import {connect} from "react-redux";

export class RecommendationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieName: props.movie ? props.movie.movieName : "",
            personName:props.review ? props.review.personName : props.username,
            content: props.review? props.review.content: "",
            score: props.review? props.review.score: 7,
            error:"",
            createdAt: moment()         
        }
    }
    onMovieNameChange =(event) => {
        if (!this.props.review) {
            const movieName = event.target.value;
            this.setState( () => ({movieName}));
        }
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
            this.setState( () => ({error: "Please fill in movie name and a movie rating" }));
        } else {
            this.setState( () => ({error: ""}));
            this.props.onSubmit({
                movieName: this.state.movieName,
                score: parseInt(this.state.score),
                createdAt: this.state.createdAt,
                personName: this.state.personName,
                content: this.state.content,
            });
        }
    };

    render() {
        return (
                <form className="form" onSubmit={this.onSubmit}>
                    {this.state.error && <p className="form__message"><em>{this.state.error}</em></p>}    
                    <input className="text-input"
                        type="text"
                        placeholder={this.props.language === "English"? "Movie Name": "שם הסרט" }
                        autoFocus
                        value = {this.state.movieName}
                        onChange= {this.onMovieNameChange}
                    />
                    
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
                    
                    <label> {this.props.language === "English"? "Your Name: ": ":השם שלך"} </label>
                    <input 
                        type="text"     
                        placeholder={this.props.language === "English"? "Your name (optional)"  : "השם שלך" }                  
                        value={this.state.personName}
                        onChange={this.onPersonNameChange}
                    />
                    
                    <div>
                        <button  className="btn button-movie btn-warning btn-lg">
                        <strong>
                        {this.props.language === "English"? " Recommend!" : "!המלץ"}
                       
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