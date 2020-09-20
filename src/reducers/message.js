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
        case "DELETE_MESSAGE":
            return {
                ...state,
                messagesRecieved: state.messagesRecieved.filter((message) => {
                    return message.id !== action.messageId;
                })  
            }
        case "DELETE_MESSAGE_FROM_SENT":
            return {
                ...state,
                messagesSent: state.messagesSent.filter((message) => {
                    return message.id !== action.messageId;
                })
            }
        case "MARK_MESSAGE_AS_READ":
            return {
                ...state,
                messagesRecieved: state.messagesRecieved.map((message) => {
                    if(message.id === action.messageId) {
                        const updatedMessageObj = {
                            ...message,
                            read: true
                        }
                        return updatedMessageObj;
                    } else {
                        return message;
                    }
                })
            }
        default:
            return state;
    }
};