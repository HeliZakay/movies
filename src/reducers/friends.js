export default (state = {friends: [], error: ""}, action) => {
    switch (action.type) {
        case "ADD_FRIEND":
            return{
                friends: [
                    ...state.friends,
                    {
                        userId: action.userId,
                        email: action.email
                    }
                ],
                error: ""
            };
        case "FRIEND_NOT_FOUND":
            return {
                friends: [...state.friends],
                error: "The email not found, maybe try another one"
            };
        case "FRIEND_FOUND":
            return {
                friends: [...state.friends],
                error: ""
            };
        case "FRIEND_ALREADY_EXIST":
            return {
                friends: [...state.friends],
                error: "The friend already exist :) Add another one"
            };
        case "SET_FRIENDS":
            return {
                friends: action.friends,
                error: ""
            }
        default:
            return state;
    }
};