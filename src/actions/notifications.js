import database from "../firebase/firebase";
import moment from "moment";

export const startDeleteNotification = ({notificationId, userId}) => {
    return (dispatch) => {
        return database.ref(`users/${userId}/notifications/${notificationId}`).remove().then(() => {
          dispatch(deleteNotification(notificationId));
        });
      }
}

export const deleteNotification = (id) => ({
    type: "DELETE_NOTIFICATION",
    id
})

export const startSendNotification = ({type, personName, movieName, userId, createdAt}) => {
    return () => {
        const createdAtFormated = moment(createdAt).format();
        return database.ref(`users/${userId}/notifications`).push({
            type,
            personName, 
            movieName, 
            createdAt: createdAtFormated,
            read: false
        })
    }
}

export const startSetNotifications = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/notifications`).once("value").then((snapshot) => {
            const notifications = [];
            if(snapshot) {
                snapshot.forEach((childSnapshot) => {
                    notifications.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });
            }
            dispatch(setNotifications(notifications));
        });
    }
}
export const setNotifications = (notifications) => ({
    type: "SET_NOTIFICATIONS",
    notifications 
})

export const startMarkNotificationAsRead = (userId, id) => {
    return (dispatch) => {
      return database.ref(`users/${userId}/notifications/${id}`).update({read: true}).then(() => {
        dispatch(markNotificationAsRead(id));
      });
    };
  };
  
  export const markNotificationAsRead = (id) => ({
    type: "MARK_NOTIFICATION_AS_READ",
    id
  });