import React from 'react';
import {connect} from "react-redux";
import MessageCard from "./MessageCard";
import { Link } from 'react-router-dom';
import {sortByDate} from "../selectors/messages";
import { startDeleteMessage, startDeleteMessageFromSent } from '../actions/messages';

  export class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: "recieved"
        }
    }
    switchToInbox =() => {
        this.setState({messages: "recieved"})
    }
    switchToSent = () => {
        this.setState({messages: "sent"})
    }
    onDelete = (messageId, userId) => {
        if (this.state.messages === "recieved") {
            this.props.startDeleteMessage({
                messageId,
                userId
            });
        } else {
            this.props.startDeleteMessageFromSent(messageId);
        }
    };
    
    render() {
        return (
    <div className="page">
    <div className={String(this.props.language !== "English" && "align-right")}>
    
    {/* <div className="page-header">
        <div className="content-container">
            <h2 className="page-header__title">
            {this.props.language === "English"? "Messages": "הודעות"}
            </h2>
        </div> */}

    <div className="messages">
    <div className="content-container">
   
    <div className="messages__nav">
    <button className="btn button-movie btn-warning btn-lg messages__nav-item" onClick={this.switchToInbox} >
    {this.props.language === "English"? "Inbox": "תיבת דואר נכנס"}
    </button>
    <button className="btn button-movie btn-warning btn-lg messages__nav-item" onClick={this.switchToSent} >
    {this.props.language === "English"? "Sent Messages": "הודעות שנשלחו"}
    </button>
    </div>
 
    <Link to="/friends">
    <button 
    className="new-message btn btn-primary button--add-friend btn-lg ">
    {this.props.language === "English"? "Send a new message!": "שלח הודעה חדשה!"}
    </button>
    </Link>
   
            {this.state.messages === "recieved"? (
                this.props.messagesRecieved.length === 0 ?
            (
                <p>
                {this.props.language === "English"? "Inbox is empty":
                 "תיבת דואר ריקה"}
                </p>
        ) : (
            <div className="row">

            {this.props.messagesRecieved.map((message) => {
               
                return (
                    <div 
                    key={message.id} 
                    className=" col-sm-12 col-md-6 col-lg-4">
                     <MessageCard
                        id={message.id}
                        movie={message.movie? message.movie : undefined}
                        createdAt= {message.createdAt}
                        username={message.recommender.username}
                        email={message.recommender.email}
                        uid={message.recommender.uid}
                        movieName={message.movie ? message.movie.movieName: undefined}
                        movieId={message.movie ? message.movie.id: undefined}
                        content={message.content}
                        onDelete={this.onDelete}
                        read={message.read}
                        cardNum= {message.cardNum? message.cardNum : "-1"}
                        type="recieved"
                        prevMessageData={message.prevMessageData? message.prevMessageData: undefined}
                        watchlist={message.watchlist? message.watchlist: undefined}
                     />     
                    </div>
                );
            })}
            </div>
        )
        
            ):
            (
                this.props.messagesSent.length === 0 ?
            (
                <p>
                {this.props.language === "English"? "Sent messages empty":
                 "אין הודעות"}
                </p>
        ) : (
            <div className="row">

            {this.props.messagesSent.map((message) => {

                return (
                    <div 
                    key={message.id} 
                    className=" col-sm-12 col-md-6 col-lg-4">
                     <MessageCard
                        id={message.id}
                        movie={message.movie? message.movie : undefined}
                        createdAt= {message.createdAt}
                        username={message.friend.username}
                        movieName={message.movie ? message.movie.movieName: undefined}
                        movieId={message.movie ? message.movie.id: undefined}
                        content={message.content}
                        onDelete={this.onDelete}
                        cardNum= {message.cardNum? message.cardNum : "-1"}
                        type="sent"
                        watchlist={message.watchlist? message.watchlist: undefined}
                     />     
                    </div>
                );
            })}
            </div>
        )

            )}

    </div>
</div>

            </div>
</div>
        );

    }
    
};
  
  const mapStateToProps = (state) => {
    return {
        messagesRecieved: sortByDate(state.messages.messagesRecieved),
        messagesSent: sortByDate(state.messages.messagesSent),
        language: state.auth.language,
        username: state.auth.username,
        uid: state.auth.uid,
        myName: state.auth.username      
    }
};

const mapDispatchToProps = (dispatch) => ({
    startDeleteMessage: (messageId, userId) => dispatch(startDeleteMessage(messageId, userId)),
    startDeleteMessageFromSent: (messageId) => dispatch(startDeleteMessageFromSent(messageId))
})
export default connect(mapStateToProps, mapDispatchToProps)( Messages);



//  export const Messages= (props) => (
//     <div>
//      <div className="page-header">
//         <div className="content-container">
//         <h2 className="page-header__title">Inbox</h2>
//         </div>         
//     </div>

//     <div className="content-container">
//     {props.messagesRecieved.length === 0 ? <p>Inbox is empty</p> :
//       (<div className="row">
//         {props.messagesRecieved.map((message) => {
//         return (
//         <div 
//         key={message.key}
//         className=" col-sm-12 col-md-6 col-lg-4"
//          >
//         <MessageCard
//          createdAt= {message.val().createdAt}
//          username={message.val().recommender.username}
//          movieName={message.val().movie.movieName}
//          movieId={message.val().movie.id}
//          content={message.val().content}
//           />     
//         </div>
//         );
//          }))}</div>
//   );