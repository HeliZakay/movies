import FriendDialog from "../components/FriendDialog";

  export const getHname = (movies, movieName) => {
    const movie = movies.filter((movie) => {
      return movie.movieName === movieName;
    });
    if (movie && movie[0] && movie[0].hname) {
      return movie[0].hname;
    }
    else {
      return undefined;
    }
  }
  
  
  export const didIGaveStarToReview = (stars, uid) => {
    let result = false;
    if (stars) {
      stars.forEach((star) => {
        if (star.uid === uid) {
          result = true;
        }
      });
    }
    return result;
  }
  
  export const sortReviewsByDateAndPerson = (reviews, person) => { 
    if (!person) {
      return reviews.sort((a,b) => { 
        return a.createdAt < b.createdAt? 1:-1;
      });
    } else {
      const sortedByDate = reviews.sort((a,b) => { 
        return a.createdAt < b.createdAt? 1:-1;
      });
     const personReview =  reviews.filter((review) => {
        return review.personName.toLowerCase().includes(person.toLowerCase());
      });
      return [...personReview, ...sortedByDate.filter((review)=> {
        return !review.personName.toLowerCase().includes(person.toLowerCase());
      })];
    }   
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
export default (movies, { text, sortBy, person, genres}, language) => {
    return movies.filter((movie) => {
      let textMatch;
      if (language === "English") {
        textMatch = movie.movieName.toLowerCase().includes(text.toLowerCase());
      } else {
        textMatch = String(movie.hname).includes(text);
      }
      let personMatch = false;
      movie.reviews.forEach((review) => {
        if (review.personName.toLowerCase().includes(person.toLowerCase())) {
          personMatch = true;
        }
      });
      let genreMatch = false;
      if (!genres) {
        genreMatch = true;
      } else if (genres.length ===0) {
        genreMatch = true;
      } else if (!movie.imdbData.Genre) {
        genreMatch = false;
      } else {
        const genresArray = movie.imdbData.Genre.split(", ");
        genresArray.forEach((genre) => {
          if (genres.includes(genre)) {
            genreMatch = true;
          }
        });
      }
      return genreMatch && textMatch && personMatch;
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
export const findMovie = (movies, movieName, personName, uid, type) => {
  const movieArr =  movies.filter((movie) => {
    return movie.movieName === movieName;
  });  
  if(movieArr && movieArr[0]) {
    const movie = movieArr[0];
    const oldReviews = movie.reviews;
    const filteredReviews = oldReviews.filter((review) => {
      if(type==="newReview") {
        return review.personName !== personName;
      }
      else {
        return review.userUid !== uid;
      }
    });
    const firstReview = oldReviews.filter((review) => {
      if(type==="newReview") {
        return review.personName === personName;
      }
      else {
        return review.userUid === uid;
      }
    });
    const sortedReviews= [...firstReview, ...filteredReviews];
    return {
      ...movie,
      reviews: sortedReviews
    };
  } else {
    return undefined;
  }
  
}

export const getUnseenMovies = (movies, uid, watchlist) => {
  return movies.filter((movie)=> {
    const reviewsUids = movie.reviews.map((review)=> {
      return review.userUid;
    });
    return (!reviewsUids.includes(uid) && !watchlist.includes(movie.id) && computeAverageScore(movie) >=7);
  });
}

export const takeTop = (array, num) => {
  if (array.length <=num) {
    return array;
  }
  else {
    return array.slice(0,num);
  }
}

export const didFriendReviewedMovie = (reviews, friendId) => {
  
  const result = reviews.filter((review) => {
    return review.userUid === friendId;
  });
  return result.length > 0;

}

const didSendReviewToMovie = ({reviews, uid}) => {
  let reviewId;
  reviews.forEach((review) => {
    if (review.userUid === uid) {
      reviewId = review.id;
    }
  });
  return reviewId;
}

export const getMyMovies = (movies, uid) => {
  return movies.filter((movie) => {
    const myReviewId = didSendReviewToMovie({reviews: movie.reviews, uid});
    if (myReviewId) {
      let hightRatedByMe = false;
      movie.reviews.forEach((review) => {
        if(review.id === myReviewId && review.score >=8){
          hightRatedByMe = true;
        }
      });
      return hightRatedByMe;
    } else {
      return false;
    }
  });
} 