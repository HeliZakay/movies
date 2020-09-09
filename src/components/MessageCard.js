import React from 'react';
import {connect} from "react-redux";
import moment from "moment";
import {isMovieOnWatchList} from "../selectors/watchList";
import {startAddMovieToWatchList, startRemoveMovieFromWatchList} from "../actions/watchList";

export class MessageCard extends React.Component{
    onAddOrRemoveFromWatchList = () => {
        (isMovieOnWatchList(this.props.watchList, this.props.movieId))? 
        this.props.startRemoveMovieFromWatchList(this.props.movieId):
        this.props.startAddMovieToWatchList(this.props.movieId);
    };
    render() {
        return (
            <div className="card card bg-light mb-3 custom-card">
            {/* <i className="fas fa-envelope"></i> */}
            <h3 className="card-header custom-card-header">
           
            Message from {this.props.username}!
            </h3>
            <div className="card-body">
            <div className="custom-card__card-content">
                <p className="card-subtitle mb-2 text-muted">Created at: {moment(this.props.createdAt).format("MMMM D, YYYY")}</p>
                <p className="card-title">Hi {this.props.myName}! I think you might like the movie {this.props.movieName}.</p>
                {this.props.content && <p className="card-text"> "{this.props.content}"</p> }
                {!(isMovieOnWatchList(this.props.watchList, this.props.movieId)) && (
                    <button 
                    className="btn button-movie btn-warning btn-lg"
                    onClick={this.onAddOrRemoveFromWatchList}>
                     Add to my watch list!
                     </button>
                )}
            </div>
            </div>
        </div>
        );
    };
};
    
        

        //  <div className="card card bg-light mb-3 custom-card">
            
        //     {this.props.userUid === this.props.currentUserUid ? (
        //         <Link to={`/edit/${this.props.id}`}><h3 className="card-header custom-card-header">Movie: {this.props.movieName}</h3></Link>
        //     ): (
        //         <h3 className="card-header custom-card-header">Movie: {this.props.movieName}</h3>
        //     )}
        //     <div className="card-body">
        //     <div className="custom-card__card-content">
        //     <p className="card-title">Score: {this.props.score}</p>
        //     <p className="card-subtitle mb-2 text-muted">Recommender: {this.props.personName}</p>
            
        //     <p className="card-text"> "{this.props.content}"</p>      
             
        //     <button className="btn button-movie btn-warning btn-lg" onClick={this.onAddOrRemoveFromWatchList}>
        //     {(isMovieOnWatchList(this.props.watchList, this.props.id)) ? "Remove from my watch list": "Add to my watch list!"}
        //     </button>
        //     </div>
          
        //     <p className="card-footer text-muted">Created At: {moment(this.props.createdAt).format("MMMM D, YYYY")}</p> 
        //     </div>
        //     </div>
            

const mapStateToProps = (state) => ({
    myName: state.auth.username,
    watchList: state.watchList
});


const mapDispatchToProps = (dispatch) => ({
    startAddMovieToWatchList: (id) => dispatch(startAddMovieToWatchList(id)),
    startRemoveMovieFromWatchList: (id) => dispatch(startRemoveMovieFromWatchList(id))
 });



export default connect(mapStateToProps, mapDispatchToProps)(MessageCard);





