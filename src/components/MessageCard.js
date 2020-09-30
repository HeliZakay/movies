import React from 'react';
import {connect} from "react-redux";
import moment from "moment";
import {isMovieOnWatchList} from "../selectors/watchList";
import {startAddMovieToWatchList, startRemoveMovieFromWatchList} from "../actions/watchList";
import {startDeleteMessage} from "../actions/messages";
import {startAddMessageToFriend} from "../actions/messages";
import {startMarkMessageAsRead} from "../actions/messages";
import Dialog from "./Dialog";



export class MessageCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showTextare: false,
            content: "",
            open: props.read,
            successMessage: false,
            prevOpen: false
        }
    }
    showTextare = () => {
        this.setState({...this.state, showTextare: !this.state.showTextare, successMessage: false});
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
            this.setState({...this.state, showTextare: false, content: "", successMessage: true});
            this.props.startAddMessageToFriend({
                recommender: this.props.user,
                friend: {
                    username: this.props.username,
                    email: this.props.email,
                    uid: this.props.uid
                },
                movie: {},
                createdAt: moment(),
                content: this.state.content,
                cardNum: "-1",
                prevMessageData: {
                    type:this.props.type,
                    myName:this.props.myName,
                    movieName:this.props.movieName? this.props.movieName: "" ,
                    username: this.props.username,
                    content: this.props.content? this.props.content: ""
                }
            });
        }
    }; 
    onOpenClick = () => {
        this.setState({...this.state, open: true});
        this.props.startMarkMessageAsRead(this.props.userId, this.props.id);
    };
    onPrevOpen =() => {
        this.setState({...this.state, prevOpen: !this.state.prevOpen});
    };
    prevFunc = (language, prevMessageData) => {
        const recommendationMessage = this.composeRecommendationMessage({
            language,
            type: prevMessageData.type,
            myName: prevMessageData.myName,
            movieName: prevMessageData.movieName,
            username: prevMessageData.username
        });
        return recommendationMessage + prevMessageData.content;
    }
    composeRecommendationMessage = ({language, type, myName, movieName, username }) => {
        if (movieName) {
            if (language === "English") {
                if (type === "recieved") {
                    return ("Hi " + myName +  " ! I think you might like the movie "+ movieName +".");
                } else {
                    return ("Hi " + username +  " ! I think you might like the movie "+ movieName +".");
                }
            } else {
                return (" נראה לי שהסרט " + movieName + " יהיה לטעמך! " );  
            }        
        } else {
            return ""
        }
    }
    render() {       
       
        return (
            <div className="card card bg-light mb-3 custom-card">
             <div className="messageCard">
            {/* <i className="fas fa-envelope"></i> */}
            <div className="card-header custom-card-header">
            <div className="custom-card-header__envelop-and-header">
            <i className="envelop material-icons">
            mail
            </i>
            <h3 >
            {this.props.type === "recieved"? 
            (this.props.language === "English" ?
             ("Message from " + this.props.username+ "!"):
              (  "הודעה מ "+this.props.username+"!")):
              this.props.language === "English" ?
              ("Message to " + this.props.username+ "!"):
              (  "הודעה ל "+this.props.username+"!")}
            
            </h3>        
            </div>
            <i onClick={() => this.props.onDelete(this.props.id, this.props.userId)} className="trash delete-icon material-icons">
            delete
            </i>
            </div>
            <div className="card-body">
            <div className="custom-card__card-content">
                <p className="card-subtitle mb-2 text-muted">
                {this.props.language === "English"? 
                " Created at: "+ moment(this.props.createdAt).format("MMMM D, YYYY"):
                 " נוצר בתאריך "+moment(this.props.createdAt).format("MMMM D, YYYY")
                }
                <br/>
                {this.props.type==="recieved" && typeof this.state.open !== "undefined" && this.state.open === false && <button
                onClick={this.onOpenClick}
                className="btn button-movie btn-warning btn-lg"
                >
                {this.props.language === "English"? "Open!" : "פתח!"}
                </button>}

               </p>
               {(this.props.type === "sent" || this.state.open===true || typeof this.state.open ==="undefined") && <div>
               {this.props.cardNum !== "-1" && <div><img className="card-in-message" src={'/images/shana-tova'+this.props.cardNum+'.png'}></img></div>} 
               {this.props.movieName &&
                 <p className="card-title">{
                     this.composeRecommendationMessage({
                         language: this.props.language,
                         type:this.props.type ,
                         myName: this.props.myName,
                         movieName: this.props.movieName,
                         username: this.props.username
                })} </p>
                }
                { this.props.content && <p className="card-text"> "{this.props.content}"</p> }
                { this.props.movieName && this.props.type==="recieved" &&
                    <Dialog movie={this.props.movie}/>
                }
                {(this.props.type !=="sent" && this.props.prevMessageData) &&
               (<a 
               onClick={this.onPrevOpen}>
               <p  className="messageCard__see-prev-text">
               {this.props.language === "English"? "See previous message you've sent" :
                 "ראה את ההודעה שאת/ה שלחת שקדמה להודעה זו"}
               </p>
                 </a>)}
                {this.state.prevOpen && this.props.prevMessageData &&
                 <p>
                 "{this.prevFunc(this.props.language, this.props.prevMessageData)}"
                 </p>}
                 <div>
                 <div className="message-card__buttons-wrapper">
                 {this.props.type !=="sent" &&
                 <button
                    onClick={this.showTextare} 
                    className="btn button-friend--message btn-primary btn-lg"
                >
                    {this.props.language === "English"? " Respond!": "הגב להודעה!"}
                </button>}
                { this.props.movieName && this.props.type==="recieved" &&
                    !(isMovieOnWatchList(this.props.watchList, this.props.movieId)) && (
                    <button 
                    className="btn button-movie btn-warning btn-lg button-watchlist"
                    onClick={this.onAddOrRemoveFromWatchList}>
                    {this.props.language === "English"? "Add to my watch list!": "הוסף לרשימת הצפייה שלי!"}
                     </button>)
                }
                </div>
                </div>
                {this.state.successMessage && <p className="success-message">
                    {this.props.language === "English"? "Your message was successfully sent!" : "ההודעה נשלחה בהצלחה!"}
                </p>}
               </div>
               }
                     {this.state.showTextare && <div><textarea className="textarea--message-only-friend"
                        placeholder={this.props.language === "English"? "write a personal message": "כתבו הודעה אישית"}
                        value={this.state.content}
                        onChange={this.onContentChange}>
                         </textarea>
                         <button
                         onClick={this.onMessageSend}
                         className="btn btn-primary button--add-friend btn-lg"
                         >
                         {this.props.language === "English"? "Send": "שלח"}
                         </button>
                         </div>}
            </div>
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
    user: state.auth,
    language: state.auth.language
});


const mapDispatchToProps = (dispatch) => ({
    startAddMovieToWatchList: (id) => dispatch(startAddMovieToWatchList(id)),
    startRemoveMovieFromWatchList: (id) => dispatch(startRemoveMovieFromWatchList(id)),
    startDeleteMessage: (messageId) => dispatch(startDeleteMessage(messageId)),
    startAddMessageToFriend: (message) => dispatch(startAddMessageToFriend(message)),
    startMarkMessageAsRead: (userId, messageId) => dispatch(startMarkMessageAsRead(userId, messageId))
 });



export default connect(mapStateToProps, mapDispatchToProps)(MessageCard);





