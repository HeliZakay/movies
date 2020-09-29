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
      case "REMOVE_MOVIE_COMPLETELY":
        return state.filter((movie) => {
          return movie.id !== action.movieId;
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
      case "GIVE_STAR_TO_REVIEW":
        return state.map((movie) => {
          if(movie.id === action.movieId) {
            const updtaedReviews = movie.reviews.map((review) => {
              if (review.id === action.reviewId) {
                let updatedStarsArray;
                if (review.stars) {
                  updatedStarsArray = [...review.stars, action.user];
                } else {
                  updatedStarsArray = [action.user];
                }
                return {
                  ...review,
                  stars: updatedStarsArray
                }
              } else {
                return review;
              }
            });
            return {
              ...movie,
              reviews: updtaedReviews
            }
          } else {
            return movie;
          }
        })
      default:
        return state;
    }
  };
