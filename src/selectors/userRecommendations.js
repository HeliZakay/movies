// Get user recommendations

export default (movies, userUid) => {
  
    const userRecommendations =  movies.filter((movie) => {
      let isMyRecommendation = false;
      movie.reviews.forEach((review) => {
        if (review.userUid === userUid) {
          isMyRecommendation = true;
        }
      });
      return isMyRecommendation;
    });
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
  {moviesToFilterFrom, recommendationsSent, friend }) => {
   let listOfForbiddenMovies = [];
   recommendationsSent.forEach((recommendation) => {
     const sameFriend = recommendation.friendId === friend.userId;
     sameFriend && listOfForbiddenMovies.push(recommendation.movieId);
   });
   const filteredList = moviesToFilterFrom.filter((movie) => {
    return (
      !listOfForbiddenMovies.includes(movie.id)
    );
   });
   return filteredList;

}