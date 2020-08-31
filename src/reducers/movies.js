// Movie Reducer

export default (state = [], action) => {
    switch (action.type) {
      case 'ADD_MOVIE':
        return [
          ...state,
          action.movie
        ];
        case 'EDIT_MOVIE':
          return state.map((movie) => {
            if (movie.id === action.id) {
              return {
                ...movie,
                ...action.updates
              };
            } else {
              return movie;
            };
          });
      case "ADD_MOVIE_TO_WATCH_LIST":
        return state.map((movie) => {
          if(movie.id === action.id) {
            return {
              ...movie,
              watchList: true
            };
          } else {
            return movie;
          }
        });
      case "REMOVE_MOVIE_FROM_WATCH_LIST":
        return state.map((movie) => {
          if(movie.id === action.id) {
            return {
              ...movie,
              watchList: false
            };
          } else {
            return movie;
          }
        });
      case 'REMOVE_MOVIE':
        return state.filter(({ id }) => id !== action.id);
      default:
        return state;
    }
  };
