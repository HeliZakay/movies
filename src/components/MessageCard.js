import React from 'react';
import {connect} from "react-redux";
import moment from "moment";
import {isMovieOnWatchList} from "../selectors/watchList";
import {startAddMovieToWatchList, startRemoveMovieFromWatchList} from "../actions/watchList";
import {startDeleteMessage} from "../actions/messages";
import {startAddMessageToFriend} from "../actions/messages";
import {startMarkMessageAsRead} from "../actions/messages";

export class MessageCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showTextare: false,
            content: "",
            open: props.read,
            successMessage: false
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
                cardNum: "-1"
            });
        }
    }; 
    onOpenClick = () => {
        this.setState({...this.state, open: true});
        this.props.startMarkMessageAsRead(this.props.userId, this.props.id);
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
            {this.props.language === "English"? ("Message from " + this.props.username+ "!"): (  "הודעה מ "+this.props.username+"!")}
            
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
                { typeof this.state.open !== "undefined" && this.state.open === false && <button
                onClick={this.onOpenClick}
                className="btn button-movie btn-warning btn-lg"
                >
                {this.props.language === "English"? "Open!" : "פתח!"}
                </button>}

               </p>
               {(this.state.open===true || typeof this.state.open ==="undefined") && <div>
               {this.props.cardNum !== "-1" && <div><img className="card-in-message" src={'/images/shana-tova'+this.props.cardNum+'.png'}></img></div>} 
                {this.props.movieName &&
                <p className="card-title">
                {this.props.language === "English"? ("Hi "+ this.props.myName +" ! I think you might like the movie "+ this.props.movieName +"."):
                ( " נראה לי שהסרט "+this.props.movieName+" יהיה לטעמך! ")
                  }
                
                </p>
                }
                { this.props.content && <p className="card-text"> "{this.props.content}"</p> }
                { this.props.movieName && 
                    !(isMovieOnWatchList(this.props.watchList, this.props.movieId)) && (
                    <button 
                    className="btn button-movie btn-warning btn-lg"
                    onClick={this.onAddOrRemoveFromWatchList}>
                    {this.props.language === "English"? "Add to my watch list!": "הוסף לרשימת הצפייה שלי!"}
                     </button>)
                }
                 <div>
                <button
                    onClick={this.showTextare} 
                    className="btn button-friend--message btn-primary btn-lg"
                >
                    {this.props.language === "English"? " Respond!": "הגב להודעה!"}
                </button>
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





