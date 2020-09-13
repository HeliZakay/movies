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
     } = movieData;
     const movie = {
      movieName
    };
    const review = {
      personName,
      score,
      content,
      createdAt: moment(createdAt).format(), 
      userUid: getState().auth.uid
    }
     return database.ref("movies").push(movie).then( (ref) => {
        return database.ref(`movies/${ref.key}/reviews`).push(review).then(() => {
          dispatch(addMovie({
            id: ref.key,
            movieName,
            reviews: [review]
          }));
        });
     });
  };
};

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
        dispatch(addReview(movieId, {
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
export const editMovie = (id, updates) => ({
  type: 'EDIT_MOVIE',
  id,
  updates
});

export const startEditMovie = (id, updates) => {
  return (dispatch) => {
     return database.ref(`movies/${id}`).update(updates).then(() => {
        dispatch(editMovie(id, updates));
     });
  };
};

 // REMOVE_MOVIE
 export const removeMovie = ({ id } = {}) => ({
  type: 'REMOVE_MOVIE',
  id
});

export const startRemoveMovie = ({id} = {}) => {
  return (dispatch, getState) => {
     return database.ref(`movies/${id}`).remove().then( () => {
        dispatch(removeMovie({id}));
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

