import StateManager from "react-select";

export default (state = [], action) => {
    switch (action.type) {
      case "SET_NOTIFICATIONS":
        return action.notifications;
      case "DELETE_NOTIFICATION":
        return state.filter((notification) => {
          return notification.id !== action.id;
        });
      case "MARK_NOTIFICATION_AS_READ":
        return state.map((notification) => {
          if (notification.id === action.id) {
            return {
              ...notification,
              read: true
            }
          } else {
            return notification;
          }
        })
      default:
        return state;
    }
  };
