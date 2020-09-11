import React from "react";
import {Link} from 'react-router-dom';
import moment from "moment";
import {startAddMovieToWatchList, startRemoveMovieFromWatchList} from "../actions/watchList";
import { connect } from "react-redux";
import {isMovieOnWatchList} from "../selectors/watchList";

export class MovieCard extends React.Component {
    onAddOrRemoveFromWatchList = () => {
        (isMovieOnWatchList(this.props.watchList, this.props.id))? 
        this.props.startRemoveMovieFromWatchList(this.props.id):
        this.props.startAddMovieToWatchList(this.props.id);
    };
    render() {
        return (
            <div className="card card bg-light mb-3 custom-card">
            
            {this.props.userUid === this.props.currentUserUid ? (
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
            )}
            <div className="card-body">
            <div className="custom-card__card-content">
            <p className="card-title"> {this.props.language === "English"?("Score: "+ this.props.score): ("ציון: "+ this.props.score)}</p>
            <p className="card-subtitle mb-2 text-muted">{this.props.language === "English"?("Recommender: "+ this.props.personName): ( ":"+this.props.personName +" ממליץ ")}</p>
            
            <p className="card-text"> "{this.props.content}"</p>      
             
            <button className="btn button-movie btn-warning btn-lg" onClick={this.onAddOrRemoveFromWatchList}>
            {(isMovieOnWatchList(this.props.watchList, this.props.id)) ? (this.props.language === "English"?"Remove from my watch list": "הסר מרשימת הצפייה שלי"): (this.props.language === "English"? "Add to my watch list!": "הוסף לרשימת הצפייה שלי")}
            </button>
            </div>
          
            <p className="card-footer text-muted">
            {this.props.language === "English"? ("Created At: " + moment(this.props.createdAt).format("MMMM D, YYYY")) : ( moment(this.props.createdAt).format("MMMM D, YYYY"))+ ": נוצר בתאריך " }
            
            </p> 
            </div>
            </div>
            
            
       
        );
    };
};


const mapDispatchToProps = (dispatch) => ({
    startAddMovieToWatchList: (id) => dispatch(startAddMovieToWatchList(id)),
    startRemoveMovieFromWatchList: (id) => dispatch(startRemoveMovieFromWatchList(id))
 });

 const mapStateToProps = (state) => ({
     currentUserUid: state.auth.uid,
     watchList: state.watchList,
     language: state.auth.language
 });

 export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);


