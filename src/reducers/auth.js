
export default (state = {uid: undefined, username: "", email: undefined,language: "", flag: false}, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                uid: action.uid
            };
        case "LOGOUT":
            return {};
        case "SET_USER_DETAILS":
            return {
                uid: action.uid,
                username: action.username,
                email: action.email,
                flag: true,
                language: action.language
            };
        case "ADD_USERNAME":
            return {
                ...state,
                username: action.username
            }
        case "ADD_LANGUAGE":
            return {
                ...state,
                language: action.language
            }
        default:
            return state;
    }
};