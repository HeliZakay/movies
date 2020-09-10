// Get user recommendations

export default (movies, userUid) => {
  
    const userRecommendations =  movies.filter((movie) => {
      return userUid === movie.userUid}
    );
    return userRecommendations;
};


export const getMovieById = (movies, movieId) => {
  movies.forEach((movie) => {
    if (movie.id === movieId) {
      return movie;
    }
  });
  };

 

export const filterOnlyMoviesNotRecommendedYet = (
  {moviesToFilterFrom, messagesSent, friend }) => {
   let listOfForbiddenMovies = [];
   messagesSent.forEach((message) => {
     const sameFriend = message.friend.uid === friend.userId;
     sameFriend && message.movie && listOfForbiddenMovies.push(message.movie.id);
   });
   const filteredList = moviesToFilterFrom.filter((movie) => {
    return (
      !listOfForbiddenMovies.includes(movie.id)
    );
   });
   return filteredList;

}