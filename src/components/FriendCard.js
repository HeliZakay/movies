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
            showUserRecommendations: false
        }
    }
    showUserRecommendations = () => {
        return(this.props.startSetMessagesSent()).then(() => {
            this.setState({showUserRecommendations: !this.state.showUserRecommendations});
        })
    };
    onRecommendationSend = (movie, content) => {
        if (movie) {
            this.setState({showUserRecommendations: false});
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
    
    render() {
        return (
            <div className="card bg-light mb-3 custom-card--friend">
            <h3 className="card-header custom-card-header"> {this.props.friendObj.username}</h3>
            <div className="card-body">
            <div className="custom-card__card-content">
            <p className="card-title">{this.props.friendObj.email}</p>
            <button onClick={this.showUserRecommendations} className="btn button-friend btn-warning btn-lg">Send {this.props.friendObj.username} a recommendation </button>
            {this.state.showUserRecommendations &&
             <UserRecommendations 
             onRecommendationSend={this.onRecommendationSend} 
             friend={this.props.friendObj}
             />
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
   

