import React from 'react';
import {connect} from "react-redux";
import moment from "moment";
import {isMovieOnWatchList} from "../selectors/watchList";
import {startAddMovieToWatchList, startRemoveMovieFromWatchList} from "../actions/watchList";
import {startDeleteMessage} from "../actions/messages";
import {startAddMessageToFriend} from "../actions/messages";

export class MessageCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showTextare: false,
            content: ""
        }
    }
    showTextare = () => {
        this.setState({...this.state, showTextare: !this.state.showTextare});
    }
    onContentChange = (event) => {
        const content = event.target.value;
        this.setState( () => ({...this.state, content}));
    };
    onAddOrRemoveFromWatchList = () => {
        (isMovieOnWatchList(this.props.watchList, this.props.movieId))? 
        this.props.startRemoveMovieFromWatchList(this.props.movieId):
        this.props.startAddMovieToWatchList(this.props.movieId);
    };
    onMessageSend = () => {
        if (this.state.content) {
            this.setState({...this.state, content: ""});
            this.setState({...this.state, showTextare: false});
            this.props.startAddMessageToFriend({
                recommender: this.props.user,
                friend: {
                    username: this.props.username,
                    email: this.props.email,
                    uid: this.props.uid
                },
                movie: {},
                createdAt: moment(),
                content: this.state.content
            });
        }
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
                     </button>)
                }
                <div>
                <button
                    onClick={this.showTextare} 
                    className="btn button-friend--message btn-primary btn-lg"
                    >
                    Respond!
                     </button>
                     </div>
                     {this.state.showTextare && <div><textarea className="textarea--message-only-friend"
                        placeholder="write a personal message"
                        value={this.state.content}
                        onChange={this.onContentChange}>
                         </textarea>
                         <button
                         onClick={this.onMessageSend}
                         className="btn btn-primary button--add-friend btn-lg"
                         >
                         Send
                         </button>
                         </div>}
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
    messages: state.messages.messagesRecieved,
    user: state.auth
});


const mapDispatchToProps = (dispatch) => ({
    startAddMovieToWatchList: (id) => dispatch(startAddMovieToWatchList(id)),
    startRemoveMovieFromWatchList: (id) => dispatch(startRemoveMovieFromWatchList(id)),
    startDeleteMessage: (messageId) => dispatch(startDeleteMessage(messageId)),
    startAddMessageToFriend: (message) => dispatch(startAddMessageToFriend(message)) 
 });



export default connect(mapStateToProps, mapDispatchToProps)(MessageCard);





