const defaultStateOfMessages = {
  messagesRecieved: [],
  messagesSent: []  
};
export default (state=defaultStateOfMessages, action) => {
    switch(action.type) {
        case "ADD_MESSAGE_TO_SENT":
            return {
                ...state,
                messagesSent: [...state.messagesSent, action.message]
            };
        case "SET_MESSAGES_RECIEVED":
            return {
                ...state,
                messagesRecieved: action.messagesRecieved
            };
        case "SET_MESSAGES_SENT":
            return {
                ...state,
                messagesSent: action.messagesSent
            };
        default:
            return state;
    }
};