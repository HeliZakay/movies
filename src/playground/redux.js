import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD_MOVIE
const addMovie = (
    {
      name="",
      score="1",
      content="",
      createdAt="0"
    } = {}
  ) => ({
    type: 'ADD_MOVIE',
    movie: {
      id: uuid(),
      name,
      score,
      content,
      createdAt
    }
  });
  
  // REMOVE_MOVIE
  const removeMovie = ({ id } = {}) => ({
    type: 'REMOVE_MOVIE',
    id
  });
  

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
  });

// SORT_BY_DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
  });
  
  // SORT_BY_AMOUNT
  const sortByScore = () => ({
    type: 'SORT_BY_SCORE'
  });


// Movie Reducer

const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return [
        ...state,
        action.movie
      ];
    case 'REMOVE_MOVIE':
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
};
// Filters Reducer

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
  };
  
  const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
      case 'SET_TEXT_FILTER':
        return {
          ...state,
          text: action.text
        };
      case 'SORT_BY_SCORE':
        return {
          ...state,
          sortBy: 'score'
        };
      case 'SORT_BY_DATE':
        return {
          ...state,
          sortBy: 'date'
        };
      default:
        return state;
    }
  };

  // Get visible movies
  const getVisibleMovies = (movies, { text, sortBy}) => {
    return movies.filter((movie) => {
      const textMatch = movie.name.toLowerCase().includes(text.toLowerCase());
      return textMatch;
    }).sort((a, b) => {
      if (sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === 'score') {
        return a.score < b.score ? 1 : -1;
      }
    });
  };

// Store creation

const store = createStore(
  combineReducers({
    movies: moviesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleMovies = getVisibleMovies(state.movies);
  console.log(visibleMovies);
});

const movieOne = store.dispatch(addMovie({ name: "Tarazan", score: "8.5", content: "Great movie"}));
const movieTwo = store.dispatch(addMovie({ name: "Notting Hill", score: "9", content: "Romantic movie"}));


const demoState = {
  movies: [{
    id: "poijasdfhwer",
    name: "Tarazan",
    score: "8.5",
    content: "Very classic Disney movie, a little bit exciting and romantic" 
  }]
};
