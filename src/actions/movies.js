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
      createdAt="0",   
      watchList="false"   
     } = movieData;

     const movie = {
      movieName,
      personName,
      score,
      content,
      createdAt: moment(createdAt).format(), 
      watchList
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


//ADD TO WATCH LIST
export const addMovieToWatchList = (id) => ({
  type: 'ADD_MOVIE_TO_WATCH_LIST',
  id
});

export const startAddMovieToWatchList = (id) => {
  return (dispatch) => {
    return database.ref(`movies/${id}`).update({watchList: true}).then(() => {
      dispatch(addMovieToWatchList(id));
    });
  };
};

export const removeMovieFromWatchList = (id) => ({
  type: 'REMOVE_MOVIE_FROM_WATCH_LIST',
  id
});

export const startRemoveMovieFromWatchList = (id) => {
  return (dispatch) => {
    return database.ref(`movies/${id}`).update({watchList: false}).then(() => {
      dispatch(removeMovieFromWatchList(id));
    });
  };
};


 // REMOVE_MOVIE
 export const removeMovie = ({ id } = {}) => ({
  type: 'REMOVE_MOVIE',
  id
});

export const startRemoveMovie = ({id} = {}) => {
  return (dispatch) => {
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
        snapshot.forEach((childSnapshot) => {
          movies.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        dispatch(setMovies(movies));
      });
    };
  };