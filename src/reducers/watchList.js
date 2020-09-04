
export default (state = [], action) => {
    switch (action.type) {
        case "ADD_MOVIE_TO_WATCH_LIST":
            return [
                ...state,
                action.id
            ];
        case "REMOVE_MOVIE_FROM_WATCH_LIST":
            return state.filter((id) => id !== action.id);
        case "SET_WATCH_LIST_MOVIES":
                return action.movies;
        default:
            return state;
    }
  };

 



