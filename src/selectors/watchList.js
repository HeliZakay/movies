//find specific movie in watchList

export const isMovieOnWatchList = (movies, id) => {
    const filteredArray = movies.filter((movie) => movie === id);
    if(filteredArray.length === 0) {
      return false;
    }
    return true;
  };

  export const getWatchListMovies = (movies, watchList) => {
    return movies.filter( (movie) => watchList.includes(movie.id) );
  };
  
