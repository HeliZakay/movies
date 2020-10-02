import database from "../firebase/firebase";
import moment from "moment";
import {countUnreadMessages} from "../selectors/messages";



export const startSetEmails = () => {
  return (dispatch) => {
  return database.ref("users").once("value").then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const name = childSnapshot.val().username
      const messagesRecieved = childSnapshot.val().messagesRecieved;
      const recievedMessages = [];
      if(messagesRecieved) {
        for (const [key,value] of Object.entries(childSnapshot.val().messagesRecieved)) {
          recievedMessages.push(value);
        }
      } 
       const notifications = childSnapshot.val().notifications;
      const notificationsArr = [];
      if(notifications) {
        for (const [key,value] of Object.entries(childSnapshot.val().notifications)) {
          notificationsArr.push(value);
        }
      } 
      if (countUnreadMessages(recievedMessages) >=1 && countUnreadMessages(notificationsArr) >=1) {
        dispatch(setEmail({
          to_name: childSnapshot.val().username, 
          unread_count: countUnreadMessages(recievedMessages),
          notification_count: countUnreadMessages(notificationsArr),
          to_email: childSnapshot.val().email,
          language: childSnapshot.val().language === "English"? 1:0
        }));
      }
    });
  });
  }
}

export const startAddMessageToFriend = ({recommender, friend, movie, createdAt, content, cardNum, prevMessageData}) => {
  return(dispatch) => {
        const messageRecieved={
            recommender,
            movie,
            createdAt: moment(createdAt).format(),
            content,
            read: false,
            cardNum,
            prevMessageData
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

export const setEmail = ({to_name, unread_count, to_email, language, notification_count}) => ({
  type: "SET_EMAIL",
  to_name,
  unread_count,
  notification_count,
  to_email,
  language
})

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
