
export default (state = {uid: undefined, username: "", email: undefined}, action) => {
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
                email: action.email
            };
        case "ADD_USERNAME":
            return {
                ...state,
                username: action.username
            }
        default:
            return state;
    }
};