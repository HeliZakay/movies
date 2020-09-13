// Get visible movies
export default (movies, { text, sortBy, person}) => {
    return movies.filter((movie) => {
      const textMatch = movie.movieName.toLowerCase().includes(text.toLowerCase());
      const personMatch = movie.reviews[0].personName.toLowerCase().includes(person.toLowerCase());
      return textMatch && personMatch;
    }).sort((a, b) => {
      if (sortBy === 'date') {
        return a.reviews[0].createdAt < b.reviews[0].createdAt ? 1 : -1;
      } else if (sortBy === 'score') {
        return a.reviews[0].score < b.reviews[0].score ? 1 : -1;
      }
    });
  };

  export const getMovieById = (movies, movieId) => {
    let result = undefined;
    movies.forEach((movie) => {
      if(movie.id === movieId) {
        result = movie;
      }
    });
    return result;
  };

  export const getMovieReviews = (movieId, movies) => {
    let reviews = [];
    movies.forEach((movie) => {
      if (movie.id === movieId) {
        reviews=movie.reviews;
      }
    });
    return reviews;
  }