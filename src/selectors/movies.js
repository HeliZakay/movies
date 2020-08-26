// Get visible movies
export default (movies, { text, sortBy, person}) => {
    return movies.filter((movie) => {
      const textMatch = movie.movieName.toLowerCase().includes(text.toLowerCase());
      const personMatch = movie.personName.toLowerCase().includes(person.toLowerCase());
      return textMatch && personMatch;
    }).sort((a, b) => {
      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === 'score') {
        return a.score < b.score ? 1 : -1;
      }
    });
  };
