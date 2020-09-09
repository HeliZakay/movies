import database from "../firebase/firebase";
import moment from "moment";

export const startAddMessageToFriend = ({recommender, friend, movie, createdAt, content}) => {
    return(dispatch) => {
        const messageRecieved={
            recommender,
            movie,
            createdAt: moment(createdAt).format(),
            content
        };
        const messageSent ={
          friend,
          movie,
          createdAt: moment(createdAt).format(),
          content
        };
        database.ref(`users/${friend.uid}/messagesRecieved`).push(messageRecieved);
        database.ref(`users/${recommender.uid}/messagesSent`).push(messageSent).then(() => {
          dispatch(addMessageToSent(messageSent));
        });
       
    };
};      

export const addMessageToSent = (message) => ({
  type: "ADD_MESSAGE_TO_SENT",
  message
});



export const startSetMessagesRecieved = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/messagesRecieved`).once("value").then((snapshot) => {
      const messagesRecieved = [];
      snapshot.forEach((childSnapshot) => {
        messagesRecieved.push(childSnapshot);
      });
      dispatch(setMessagesRecieved(messagesRecieved));
    });
  };
};

export const startSetMessagesSent = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/messagesSent`).once("value").then((snapshot) => {
      const messagesSent = [];
      snapshot.forEach((childSnapshot) => {
        messagesSent.push(childSnapshot);
      });
      dispatch(setMessagesSent(messagesSent));
    });
  };
};


export const setMessagesRecieved = (messagesRecieved) => ({
  type: "SET_MESSAGES_RECIEVED",
  messagesRecieved
});

export const setMessagesSent = (messagesSent) => ({
  type: "SET_MESSAGES_SENT",
  messagesSent
});

