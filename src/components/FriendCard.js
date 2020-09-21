import React from "react";
import UserRecommendations from "./UserRecommendations";
import { connect } from "react-redux";
import moment from "moment";
import {startSetMessagesSent, startAddRecommendation, startAddMessageToFriend} from "../actions/messages"; 

export class FriendCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showUserRecommendations: false,
            showTextare: false,
            content: "",
            successMessage: false
        }
    }
    showUserRecommendations = () => {
        return(this.props.startSetMessagesSent()).then(() => {
            this.setState({...this.state, showUserRecommendations: !this.state.showUserRecommendations, successMessage: false, showTextare:false});
        })
    };
    showTextare = () => {
        this.setState({...this.state, showTextare: !this.state.showTextare, successMessage: false, showUserRecommendations: false});
    }
    onContentChange = (event) => {
        const content = event.target.value;
        this.setState( () => ({...this.state, content}));
    };
    onRecommendationSend = (movie, content) => {
        if (movie) {
            this.setState({...this.state, showUserRecommendations: false, successMessage:true});
            this.props.startAddMessageToFriend({
                recommender: this.props.user,
                friend :{
                    username: this.props.friendObj.username,
                    email: this.props.friendObj.email,
                    uid: this.props.friendObj.userId
                },
                movie,
                createdAt: moment(),
                content,
                cardNum: "-1",
                prev: "-1"
            });
            this.props.startAddRecommendation({
                friendId: this.props.friendObj.userId,
                movieId: movie.id
            });
        }
    }
    onMessageSend = () => {
        
        if (this.state.content) {
            this.setState({...this.state, showTextare: false, content: "", successMessage: true});
            this.props.startAddMessageToFriend({
                recommender: this.props.user,
                friend: {
                    username: this.props.friendObj.username,
                    email: this.props.friendObj.email,
                    uid: this.props.friendObj.userId
                },
                movie: {},
                createdAt: moment(),
                content: this.state.content,
                cardNum: "-1",
                prev: "-1"
            });
        }
    };  

    render() {
        return (
            <div className="card bg-light mb-3 custom-card--friend">
            <h3 className="card-header custom-card-header"> {this.props.friendObj.username}</h3>
            <div className="friend-card">
            <div className="card-body">
            <div className="custom-card__card-content">
            <p className="card-title">{this.props.friendObj.email}</p>
            <button 
            onClick={this.showUserRecommendations} 
            className="btn button-friend btn-warning btn-lg">
             {this.props.language === "English"? ("Send "+ this.props.friendObj.username + " a recommendation"):
                ("שלחו המלצה ל"+this.props.friendObj.username)
                } 
            </button> 
            <br/>
            <button
            onClick={this.showTextare} 
            className="btn button-friend--message btn-primary btn-lg">
             {this.props.language === "English"? ("Send "+ this.props.friendObj.username + " a message"):
                ("שלחו הודעה ל"+this.props.friendObj.username)
                }
            </button>
            {this.state.successMessage && <p className="success-message">
                    {this.props.language === "English"? "Your message was successfully sent!" : "ההודעה נשלחה בהצלחה!"}
                </p>}
            {this.state.showUserRecommendations &&
             <UserRecommendations 
             onRecommendationSend={this.onRecommendationSend} 
             friend={this.props.friendObj}
             />}
            {this.state.showTextare &&
            <div>
            <textarea className="textarea--message-only-friend"
                        placeholder={this.props.language === "English"? "write a personal message": "כתבו הודעה אישית"}
                        value={this.state.content}
                        onChange={this.onContentChange}>
            </textarea>
            <button   
                onClick={this.onMessageSend}
                className="btn btn-primary button--add-friend btn-lg">
                {this.props.language === "English"? ("Send to "+ this.props.friendObj.username):
                ("שלחו ל"+this.props.friendObj.username)
                }
                
             </button> 
            </div>
            }
            </div>
            </div>
            </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.auth,
    language: state.auth.language
});


const mapDispatchToProps = (dispatch) => ({
    startAddMessageToFriend: (message) => dispatch(startAddMessageToFriend(message)),
    startSetMessagesSent: () => dispatch(startSetMessagesSent()),
    startAddRecommendation: (recommendation) => dispatch(startAddRecommendation(recommendation))
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendCard);
   

