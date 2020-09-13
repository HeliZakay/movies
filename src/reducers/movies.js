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
      case 'REMOVE_MOVIE':
        return state.filter(({ id }) => id !== action.id);
      case "SET_MOVIES":
        return action.movies;
      case "ADD_REVIEW":
          state.map((movie) => {
            if (movie.id === action.movieId) {
              if (!movie.reviews) {
                movie.reviews = new Array();
              }  
              movie.reviews.push(action.review)
                return {
                  ...movie,
                  reviews: movie.reviews
              }
            }
            else {return movie};
          });   
      default:
        return state;
    }
  };
