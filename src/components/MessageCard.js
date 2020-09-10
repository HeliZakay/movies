import React from 'react';
import {connect} from "react-redux";
import moment from "moment";
import {isMovieOnWatchList} from "../selectors/watchList";
import {startAddMovieToWatchList, startRemoveMovieFromWatchList} from "../actions/watchList";
import {startDeleteMessage} from "../actions/messages";

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
            <div className="card-header custom-card-header">
            <div className="custom-card-header__envelop-and-header">
            <i className="envelop material-icons">
            mail
            </i>
            <h3 >
            Message from {this.props.username}!
            </h3>        
            </div>
            <i onClick={() => this.props.onDelete(this.props.id, this.props.userId)} className="trash delete-icon material-icons">
            delete
            </i>
            </div>
            <div className="card-body">
            <div className="custom-card__card-content">
                <p className="card-subtitle mb-2 text-muted">Created at: {moment(this.props.createdAt).format("MMMM D, YYYY")}</p>
                {this.props.movieName &&
                <p className="card-title">Hi {this.props.myName}! I think you might like the movie {this.props.movieName}.</p>
                }
                {this.props.content && <p className="card-text"> "{this.props.content}"</p> }
                {this.props.movieName && 
                    !(isMovieOnWatchList(this.props.watchList, this.props.movieId)) && (
                    <button 
                    className="btn button-movie btn-warning btn-lg"
                    onClick={this.onAddOrRemoveFromWatchList}>
                     Add to my watch list!
                     </button>
                )
                }
            </div>
            </div>
        </div>
        );
    };
};
    

const mapStateToProps = (state) => ({
    myName: state.auth.username,
    watchList: state.watchList,
    userId: state.auth.uid,
    messages: state.messages.messagesRecieved
});


const mapDispatchToProps = (dispatch) => ({
    startAddMovieToWatchList: (id) => dispatch(startAddMovieToWatchList(id)),
    startRemoveMovieFromWatchList: (id) => dispatch(startRemoveMovieFromWatchList(id)),
    startDeleteMessage: (messageId) => dispatch(startDeleteMessage(messageId))
 });



export default connect(mapStateToProps, mapDispatchToProps)(MessageCard);





