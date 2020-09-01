import uuid from "uuid";
import database from "../firebase/firebase";
import moment from "moment";


// ADD_MOVIE
export const addMovie = (movie) =>  ({
      type: 'ADD_MOVIE',
      movie
});
  
export const startAddMovie = (movieData = {}) => {
  return (dispatch) => {
    const {
      movieName="",
      personName="",
      score=0,
      content="",
      createdAt="0"      
     } = movieData;
     const movie = {movieName, personName, score, content, createdAt: moment(createdAt).format() };
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

//ADD TO WATCH LIST
export const addMovieToWatchList = (id) => ({
  type: 'ADD_MOVIE_TO_WATCH_LIST',
  id
});

export const removeMovieFromWatchList = (id) => ({
  type: 'REMOVE_MOVIE_FROM_WATCH_LIST',
  id
});


  // REMOVE_MOVIE
  export const removeMovie = ({ id } = {}) => ({
    type: 'REMOVE_MOVIE',
    id
  });
  