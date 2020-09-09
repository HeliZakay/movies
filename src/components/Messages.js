import React from 'react';
import {connect} from "react-redux";
import MessageCard from "./MessageCard";
import { Link } from 'react-router-dom';


  export const Messages = (props) => {
    return (
        <div>

            <div className="page-header">
                <div className="content-container">
                    <h2 className="page-header__title">Inbox</h2>
                </div>
            </div>

            <div className="content-container">
            <Link to="/friends">
            <button 
            className="new-message btn btn-primary button--add-friend btn-lg ">
            Send a new message!
            </button>
            </Link>
                {props.messagesRecieved.length === 0 ?
                    (
                    <p>Inbox is empty</p>
                ) : (
                    <div className="row">

                    {props.messagesRecieved.map((message) => {
                        return (
                            <div 
                            key={message.key} 
                            className=" col-sm-12 col-md-6 col-lg-4">
                             <MessageCard
                                createdAt= {message.val().createdAt}
                                username={message.val().recommender.username}
                                movieName={message.val().movie.movieName}
                                movieId={message.val().movie.id}
                                content={message.val().content}
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
};
  
  const mapStateToProps = (state) => {
    return {
        messagesRecieved: state.messages.messagesRecieved,
        messagesSent: state.messages.messagesSent,
           
    }
};
export default connect(mapStateToProps)( Messages);



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