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
      movieName,
      personName,
      score,
      content,
      createdAt: moment(createdAt).format(), 
      userUid: getState().auth.uid
    };
     return database.ref("movies").push(movie).then( (ref) => {
        dispatch(addMovie({
          id: ref.key,
          ...movie
        }));
     });
  };
};

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
              movies.push({
                 id: movieSnapshot.key,
                 ...movieSnapshot.val()
              });
        });
        dispatch(setMovies(movies));
      }); 
    };
  };