import React from "react";
import moment from "moment";
import {connect} from "react-redux";

export class RecommendationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieName: props.movie ? props.movie.movieName : "",
            personName:props.movie ? props.movie.personName : props.username,
            content: props.movie? props.movie.content: "",
            score: props.movie? props.movie.score: 7,
            error:"",
            createdAt: props.movie? props.movie.createdAt: moment()         
        }
    }
    onMovieNameChange =(event) => {
        const movieName = event.target.value;
        this.setState( () => ({movieName}));
    };
    onPersonNameChange =(event) => {
        const personName = event.target.value;
        this.setState( () => ({personName}));
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
                        placeholder="Movie Name"
                        autoFocus
                        value = {this.state.movieName}
                        onChange= {this.onMovieNameChange}
                    />
                    
                    <label> Movie Rating: </label>
                     <input 
                        type="number"                        
                        value={this.state.score}
                        onChange={this.onScoreChange}
                        min="1"
                        max="10"
                    />
                    
                    <textarea className="textarea"
                        placeholder="Write your review for the movie (optional)"
                        value={this.state.content}
                        onChange={this.onContentChange}>
                    </textarea>
                    
                    <label> Your Name: </label>
                    <input 
                        type="text"     
                        placeholder="Your name (optional)"                   
                        value={this.state.personName}
                        onChange={this.onPersonNameChange}
                    />
                    
                    <div>
                        <button className="button button--form"><strong>Recommend!</strong></button>
                    </div>
                    
                </form>
            
        );
    }
}
const mapStateToProps = (state) => ({
    username: state.auth.username
});
export default connect(mapStateToProps)(RecommendationForm);