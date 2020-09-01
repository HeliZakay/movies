import React from "react";
import {Link} from 'react-router-dom';
import moment from "moment";
import {startAddMovieToWatchList, startRemoveMovieFromWatchList} from "../actions/movies";
import { connect } from "react-redux";

export class MovieCard extends React.Component {
    onAddOrRemoveFromWatchList = () => {
        this.props.watchList? 
        this.props.startRemoveMovieFromWatchList(this.props.id) :
        this.props.startAddMovieToWatchList(this.props.id);
    };
    render() {
        return (
            <div>
            <Link to={`/edit/${this.props.id}`}><h3>Movie: {this.props.movieName}</h3></Link>
            {/* <p>Recommender: {this.props.personName}</p> */}
            <p>Score: {this.props.score}</p>
            <p>Content: "{this.props.content}"</p>      
            <p>Created At: {moment(this.props.createdAt).format("MMMM D, YYYY")}</p> 
            <button onClick={this.onAddOrRemoveFromWatchList}>
            {this.props.watchList? "Remove from my watching list": "Add to my watching List!"}
            </button>   
        </div>
        );
    };
};

const mapDispatchToProps = (dispatch) => ({
    startAddMovieToWatchList: (id) => dispatch(startAddMovieToWatchList(id)),
    startRemoveMovieFromWatchList: (id) => dispatch(startRemoveMovieFromWatchList(id))
 });

 export default connect(undefined, mapDispatchToProps)(MovieCard);




// const MovieCard = ({id, movieName, personName, score, content, createdAt}) => (
//         <div>
//             <Link to={`/edit/${id}`}><h3>Movie: {movieName}</h3></Link>
//             <p>Recommender: {personName}</p>
//             <p>Score: {score}</p>
//             <p>Content: "{content}"</p>      
//             <p>Created At: {moment(createdAt).format("MMMM D, YYYY")}</p> 
//             <button onClick={addToWatchListHandler}>Add to my watching List!</button>   
            
//         </div>
// );

// export default MovieCard;