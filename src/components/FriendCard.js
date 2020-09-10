import React from "react";
import UserRecommendations from "./UserRecommendations";
import {startAddMessageToFriend} from "../actions/messages";
import { connect } from "react-redux";
import moment from "moment";
import {startSetMessagesSent} from "../actions/messages"; 

export class FriendCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showUserRecommendations: false,
            showTextare: false,
            content: "",

        }
    }
    showUserRecommendations = () => {
        return(this.props.startSetMessagesSent()).then(() => {
            this.setState({...this.state, showUserRecommendations: !this.state.showUserRecommendations});
        })
    };
    showTextare = () => {
        this.setState({...this.state, showTextare: !this.state.showTextare});
    }
    onContentChange = (event) => {
        const content = event.target.value;
        this.setState( () => ({...this.state, content}));
    };
    onRecommendationSend = (movie, content) => {
        if (movie) {
            this.setState({...this.state, showUserRecommendations: false});
            this.props.startAddMessageToFriend({
                recommender: this.props.user,
                friend :{
                    username: this.props.friendObj.username,
                    email: this.props.friendObj.email,
                    uid: this.props.friendObj.userId
                },
                movie,
                createdAt: moment(),
                content
            });
        }
    }
    onMessageSend = () => {
        if (this.state.content) {
            this.setState({...this.state, showTextare: false});
            this.props.startAddMessageToFriend({
                recommender: this.props.user,
                friend: {
                    username: this.props.friendObj.username,
                    email: this.props.friendObj.email,
                    uid: this.props.friendObj.userId
                },
                movie: {},
                createdAt: moment(),
                content: this.state.content
            });
        }
    };  

    render() {
        return (
            <div className="card bg-light mb-3 custom-card--friend">
            <h3 className="card-header custom-card-header"> {this.props.friendObj.username}</h3>
            <div className="card-body">
            <div className="custom-card__card-content">
            <p className="card-title">{this.props.friendObj.email}</p>
            <button 
            onClick={this.showUserRecommendations} 
            className="btn button-friend btn-warning btn-lg">
            Send {this.props.friendObj.username} a recommendation 
            </button>
            <button
            onClick={this.showTextare} 
            className="btn button-friend--message btn-primary btn-lg">
            Send {this.props.friendObj.username} a message 
            </button>
            {this.state.showUserRecommendations &&
             <UserRecommendations 
             onRecommendationSend={this.onRecommendationSend} 
             friend={this.props.friendObj}
             />}
            {this.state.showTextare &&
            <div>
            <textarea className="textarea--message-only-friend"
                        placeholder="write a personal message"
                        value={this.state.content}
                        onChange={this.onContentChange}>
            </textarea>
            <button   
                onClick={this.onMessageSend}
                className="btn btn-primary button--add-friend btn-lg">
                Send to {this.props.friendObj.username}
             </button> 
            </div>
            }
            </div>
            </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.auth
});


const mapDispatchToProps = (dispatch) => ({
    startAddMessageToFriend: (recommender, friend, movies) => dispatch(startAddMessageToFriend(recommender, friend, movies)),
    startSetMessagesSent: () => dispatch(startSetMessagesSent())
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendCard);
   

