import uuid from "uuid";
import database from "../firebase/firebase";
import moment from "moment";


// ADD_MOVIE
export const addMovie = (movie = {
        personName: "",
        movieName: "",
        content: "",
        score: 0,
        createdAt: 0
}) => {
    return ({
      type: 'ADD_MOVIE',
      movie: {
        ...movie,
        id: uuid()
      }
    });
  };


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


  // REMOVE_MOVIE
  export const removeMovie = ({ id } = {}) => ({
    type: 'REMOVE_MOVIE',
    id
  });
  