
  export const sortReviewsByDateAndPerson = (reviews, person) => { 
    return reviews.sort((a,b) => { 
        return a.createdAt < b.createdAt? 1:-1;
      });
  };
  
const computeAverageScore = (movie) => {
  let sum = 0;
  movie.reviews.forEach((review) => {
      sum += Number(review.score);
  });
  const result = sum/movie.reviews.length;
  return  Math.round(result*2)/2;;
}

// Get visible movies
export default (movies, { text, sortBy, person}) => {
    return movies.filter((movie) => {
      const textMatch = movie.movieName.toLowerCase().includes(text.toLowerCase());
      let personMatch = false;
      movie.reviews.forEach((review) => {
        if (review.personName.toLowerCase().includes(person.toLowerCase())) {
          personMatch = true;
        }
      });
      return textMatch && personMatch;
    }).map((movie) => {
      const sorted = sortReviewsByDateAndPerson(movie.reviews, person);
      return {...movie, reviews: sorted};
    }).sort((a, b) => {
      if (sortBy === 'date') {
        return a.reviews[0].createdAt < b.reviews[0].createdAt ? 1 : -1;
      } else if (sortBy === 'score') {
        return computeAverageScore(a) < computeAverageScore(b) ? 1 : -1;
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

  export const isMovieNameExistsAlready = (movieName, movies) => {
    let result = undefined;
    movies.forEach((movie) => {
      if (movie.movieName === movieName) {
        result=movie.id;
      }
    });
    return result;
  }
