import database from "../firebase/firebase";
import moment from "moment";

export const startAddMessageToFriend = ({recommender, friend, movie, createdAt, content, cardNum, prev}) => {
    return(dispatch) => {
        const messageRecieved={
            recommender,
            movie,
            createdAt: moment(createdAt).format(),
            content,
            read: false,
            cardNum,
            prev
        };
        const messageSent ={
          friend,
          movie,
          createdAt: moment(createdAt).format(),
          content,
          cardNum
        };
        database.ref(`users/${friend.uid}/messagesRecieved`).push(messageRecieved);
        database.ref(`users/${recommender.uid}/messagesSent`).push(messageSent).then((ref) => {
          dispatch(addMessageToSent({id: ref.key,...messageSent}));
        });
       
    };
};      

export const addMessageToSent = (message) => ({
  type: "ADD_MESSAGE_TO_SENT",
  message
});

export const startAddRecommendation = ({friendId, movieId}) => {
  return(dispatch, getState) => {
    const recommendation = {friendId, movieId};
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/recommendations`).push(recommendation).then((ref) => {
      dispatch(addRecommendation({
        ...recommendation,
        id: ref.key
      }));
    });
  }
}
export const addRecommendation = (recommendation) => ({
  type: "ADD_RECOMMENDATION",
  recommendation
})

export const startDeleteMessageFromSent = (messageId) => {
  
  return (dispatch, getState) => {
    const uid=getState().auth.uid;
    return database.ref(`users/${uid}/messagesSent/${messageId}`).remove().then(() => {
      dispatch(deleteMessageFromSent(messageId));
    });
  }
}


export const deleteMessageFromSent = (messageId) => ({
  type: "DELETE_MESSAGE_FROM_SENT",
  messageId
});

export const startDeleteMessage = ({messageId, userId}) => {
    return (dispatch) => {
      return database.ref(`users/${userId}/messagesRecieved/${messageId}`).remove().then(() => {
        dispatch(deleteMessage(messageId));
      });
    }
}

export const deleteMessage = (messageId) => ({
    type: "DELETE_MESSAGE",
    messageId
});


export const startSetMessagesRecieved = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/messagesRecieved`).once("value").then((snapshot) => {
      const messagesRecieved = [];
      snapshot.forEach((childSnapshot) => {
        messagesRecieved.push({...childSnapshot.val(), id: childSnapshot.key});
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
        messagesSent.push({...childSnapshot.val(), id: childSnapshot.key});
      });
      dispatch(setMessagesSent(messagesSent));
    });
  };
};

export const startSetRecommendations = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/recommendations`).once("value").then((snapshot) => {
      const recommendations = [];
      snapshot.forEach((childSnapshot) => {
        recommendations.push({...childSnapshot.val(), id: childSnapshot.key});
      });
      dispatch(setRecommendations(recommendations));
    });
  }
}
export const setRecommendations = (recommendations) => ({
  type: "SET_RECOMMENDATIONS",
  recommendations 
})

export const setMessagesRecieved = (messagesRecieved) => ({
  type: "SET_MESSAGES_RECIEVED",
  messagesRecieved
});

export const setMessagesSent = (messagesSent) => ({
  type: "SET_MESSAGES_SENT",
  messagesSent
});

export const startMarkMessageAsRead = (userId, messageId) => {
  return (dispatch) => {
    return database.ref(`users/${userId}/messagesRecieved/${messageId}`).update({read: true}).then(() => {
      dispatch(markMessageAsRead(messageId));
    });
  };
};

export const markMessageAsRead = (messageId) => ({
  type: "MARK_MESSAGE_AS_READ",
  messageId
});
