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
            if (movie.id === action.movieId) {
              const updatedReviewsArray =  movie.reviews.map((review) => {
                if (review.id === action.reviewId) {
                  return {
                    ...review,
                    ...action.updatedReview
                  };
                }
                else {
                  return review;
                };
              });
              return {
                ...movie,
                reviews: updatedReviewsArray
              }
            } else {
              return movie;
            };
          });
      case 'REMOVE_MOVIE':
        return state.map((movie) => {
          if (movie.id === action.movieId){
            return {
              ...movie,
              reviews: movie.reviews.filter((review) => review.id !== action.reviewId)
            };
          } else {
            return movie;
          }
        });
      case "SET_MOVIES":
        return action.movies;
      case "ADD_REVIEW":
          return state.map((movie) => {
            if (movie.id === action.movieId) {
              const updatedReviewsArray = [action.review, ...movie.reviews];
                return {
                  ...movie, 
                  reviews: updatedReviewsArray
              }
            }
            else {return movie};
          });   
      default:
        return state;
    }
  };
