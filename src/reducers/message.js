const defaultStateOfMessages = {
  messagesRecieved: [],
  messagesSent: [],
  recommendations: [],
  emails: []
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
        case "ADD_RECOMMENDATION":
            return {
                ...state,
                recommendations: [...state.recommendations, action.recommendation]
            }
        case "SET_RECOMMENDATIONS":
            return {
                ...state,
                recommendations: action.recommendations
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
        case "SET_EMAIL":
            return {
                ...state,
                emails: [...state.emails, {
                    to_name: action.to_name,
                    unread_count: action.unread_count,
                    notification_count: action.notification_count,
                    to_email: action.to_email,
                    language: action.language
                }
                ]
            }
        default:
            return state;
    }
};