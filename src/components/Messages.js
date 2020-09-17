import React from 'react';
import {connect} from "react-redux";
import MessageCard from "./MessageCard";
import { Link } from 'react-router-dom';
import {sortByDate} from "../selectors/messages";
import { startDeleteMessage } from '../actions/messages';


  export class Messages extends React.Component {
    onDelete = (messageId, userId) => {
        this.props.startDeleteMessage({
            messageId,
            userId
        });
    };
    render() {
        return (
            <div className={String(this.props.language !== "English" && "align-right")}>
    
                <div className="page-header">
                    <div className="content-container">
                        <h2 className="page-header__title">
                        {this.props.language === "English"? "Inbox": "תיבת דואר נכנס"}
                        </h2>
                    </div>
                </div>
    
                <div className="content-container">
                <Link to="/friends">
                <button 
                className="new-message btn btn-primary button--add-friend btn-lg ">
                {this.props.language === "English"? "Send a new message!": "שלח הודעה חדשה!"}
                </button>
                </Link>
                    {this.props.messagesRecieved.length === 0 ?
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
                                    createdAt= {message.createdAt}
                                    username={message.recommender.username}
                                    email={message.recommender.email}
                                    uid={message.recommender.uid}
                                    movieName={message.movie ? message.movie.movieName: undefined}
                                    movieId={message.movie ? message.movie.id: undefined}
                                    content={message.content}
                                    onDelete={this.onDelete}
                                    read={message.read}
                                    cardNum= {message.cardNum? message.cardNum : undefined}
                                 />     
                                </div>
                            );
                        })}
                        </div>
                    )
                    }
                </div>
            </div>
        );

    }
    
};
  
  const mapStateToProps = (state) => {
    return {
        messagesRecieved: sortByDate(state.messages.messagesRecieved),
        messagesSent: state.messages.messagesSent,
        language: state.auth.language           
    }
};

const mapDispatchToProps = (dispatch) => ({
    startDeleteMessage: (messageId, userId) => dispatch(startDeleteMessage(messageId, userId))
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