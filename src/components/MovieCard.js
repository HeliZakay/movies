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
            <div>
            {this.props.userUid === this.props.currentUserUid ? (
                <Link to={`/edit/${this.props.id}`}><h3>Movie: {this.props.movieName}</h3></Link>
            ): (
                <h3>Movie: {this.props.movieName}</h3>
            )}
            <p>Recommender: {this.props.personName}</p>
            <p>Score: {this.props.score}</p>
            <p>Content: "{this.props.content}"</p>      
            <p>Created At: {moment(this.props.createdAt).format("MMMM D, YYYY")}</p> 
            <button onClick={this.onAddOrRemoveFromWatchList}>
            {(isMovieOnWatchList(this.props.watchList, this.props.id)) ? "Remove from my watching list": "Add to my watching List!"}
            </button>  
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
     watchList: state.watchList
 });

 export default connect(mapStateToProps, mapDispatchToProps)(MovieCard);


