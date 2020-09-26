import uuid from "uuid";
import database from "../firebase/firebase";
import moment from "moment";



// ADD_MOVIE
export const addMovie = (movie) =>  ({
      type: 'ADD_MOVIE',
      movie
});
  
export const startAddMovie = (movieData = {}) => {
  return (dispatch, getState) => {
    const {
      movieName="",
      personName="",
      score=0,
      content="",
      createdAt="0",
      genres     
     } = movieData;
     let movie = {
      movieName
    };
    if (genres) {
      movie = {
        ...movie,
        genres
      }
    }
    const review = {
      personName,
      score,
      content,
      createdAt: moment(createdAt).format(), 
      userUid: getState().auth.uid
    }
     return database.ref("movies").push(movie).then( (ref) => {
        return database.ref(`movies/${ref.key}/reviews`).push(review).then((r) => {
          dispatch(addMovie({
            id: ref.key,
            movieName,
            reviews: [{...review, id: r.key}],
            genres
          }));
        });
     });
  };
};


// export const  = () => {
//   return (dispatch, getState) => {
   
//     return database.ref("movies").once("value").then((snapshot) => {
//       snapshot.forEach((childSnapshot) => {
//         const movieName = childSnapshot.val().movieName;
//         const id = childSnapshot.val().id;
//         const genres = getMovieGenres(movieName);
//         if (genres) {
//           return database.ref(`movies/${id}`).update({genres: genres});
//         }
//       });
//     });
//   }
// }

export const startAddReview = ({movieId, score, personName, content, createdAt}) => {
  return (dispatch, getState) => {
     const reviewItem = {
      personName,
      score,
      content,
      createdAt: moment(createdAt).format(), 
      userUid: getState().auth.uid
    };
     return database.ref(`movies/${movieId}/reviews`).push(reviewItem).then( (ref) => {
        return dispatch(addReview(movieId, {
          id: ref.key,
          ...reviewItem
        }));
     });
  };
};

export const addReview = (movieId, review) => ({
  type: "ADD_REVIEW",
  review,
  movieId
});


// EDIT_MOVIE
export const editMovie = ({movieId, reviewId, updatedReview}) => ({
  type: 'EDIT_MOVIE',
  movieId,
  reviewId,
  updatedReview
});

export const startEditMovie = ({movieId, reviewId, updatedReview}) => {
  return (dispatch) => {
     return database.ref(`movies/${movieId}/reviews/${reviewId}`).update(updatedReview).then(() => {
        dispatch(editMovie({movieId, reviewId, updatedReview}));
     });
  };
};

 // REMOVE_MOVIE
 export const removeMovie = ({movieId, reviewId} = {}) => ({
  type: 'REMOVE_MOVIE',
  movieId,
  reviewId
});

export const removeMovieCompletely = ({movieId}) => ({
  type: "REMOVE_MOVIE_COMPLETELY",
  movieId
});

export const startRemoveMovie = ({movieId, reviewId} = {}) => {
  return (dispatch) => {
     return database.ref(`movies/${movieId}/reviews/${reviewId}`).remove().then( () => {
        return database.ref(`movies/${movieId}`).once("value").then((snapshot) => {
          if (!snapshot.val().reviews) {
            return database.ref(`movies/${movieId}`).remove().then(() => {
              dispatch(removeMovieCompletely({movieId}));
            });
          } else {
            dispatch(removeMovie({movieId, reviewId}));
          }
        });
     });
  };
};

 

  //SET_MOVIES
  export const setMovies = (movies) => ({
    type: "SET_MOVIES",
    movies
  });


  export const startSetMovies = () => {
    return (dispatch) => {
      return database.ref("movies").once("value").then( (snapshot) => {
        const movies = [];
        snapshot.forEach((movieSnapshot) => {
            const reviews = [];
            if (movieSnapshot.val().reviews){
              const reviewsObj = movieSnapshot.val().reviews;
              for (const [key, value] of Object.entries(reviewsObj)) {
                reviews.push({
                  id: key,
                  ...value
                });
              }
            }
              movies.push({
                 id: movieSnapshot.key,
                 ...movieSnapshot.val(),
                 reviews
              });
        });
        dispatch(setMovies(movies));
      }); 
    };
  };

export const unifyReviews = () => {
  database.ref("movies/-MGnz68SXXFy0sVqeoP3").remove();
    
}