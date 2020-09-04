import database from "../firebase/firebase";


//ADD TO WATCH LIST
export const addMovieToWatchList = (id) => ({
    type: 'ADD_MOVIE_TO_WATCH_LIST',
    id
  });

  
  export const startAddMovieToWatchList = (id) => {
    return (dispatch, getState) => {
      const uid = getState().auth.uid;
      return database.ref(`users/${uid}/watchList/${id}`).update({something: "something"}).then(() => {
        dispatch(addMovieToWatchList(id));
      });
    };
  };


export const removeMovieFromWatchList = (id) => ({
    type: 'REMOVE_MOVIE_FROM_WATCH_LIST',
    id
  });
  

  export const startRemoveMovieFromWatchList = (id) => {
    return (dispatch, getState) => {
      const uid = getState().auth.uid;
      return database.ref(`users/${uid}/watchList/${id}`).remove().then(() => {
        dispatch(removeMovieFromWatchList(id));
      });
    };
  };

  export const setWatchListMovies = (movies) => ({
    type: "SET_WATCH_LIST_MOVIES",
    movies
  });

 
  export const startSetWatchListMovies = () => {
    return (dispatch, getState) => {
      const uid = getState().auth.uid;
      return database.ref(`users/${uid}/watchList`).once("value").then( (watchList) => {
        const watchListMovies = [];
        watchList.forEach((movieSnapshot) => {
          watchListMovies.push(movieSnapshot.key);
        });
        
        dispatch(setWatchListMovies(watchListMovies));
      }); 
    };
  };