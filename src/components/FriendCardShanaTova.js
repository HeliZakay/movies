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
            cardSent: false
        }
    }
   
    showTextare = () => {
        this.setState({...this.state, showTextare: !this.state.showTextare});
    }
    onContentChange = (event) => {
        const content = event.target.value;
        this.setState( () => ({...this.state, content}));
    };
   
    onMessageSend = () => {
        if (this.state.content) {
            this.setState({...this.state, showTextare: false, content: "", cardSent: true});
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
                cardNum: this.props.cardNum
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
           
            {this.state.cardSent? <p className="success-message">ההודעה נשלחה בהצלחה!</p>:<button
            onClick={this.showTextare} 
            className="btn button-friend--message btn-primary btn-lg">שלח שנה טובה 
            </button>}

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
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.auth,
    language: state.auth.language
});


const mapDispatchToProps = (dispatch) => ({
    startAddMessageToFriend: (message) => dispatch(startAddMessageToFriend(message)),
    startSetMessagesSent: () => dispatch(startSetMessagesSent())
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendCard);
   

