// Filters Reducer
const filtersReducerDefaultState = {
    text: '',
    person: '',
    genres: [],
    sortBy: 'date',
  };
  
export default (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
      case 'SET_TEXT_FILTER':
        return {
          ...state,
          text: action.text
        };
      case "SET_PERSON_FILTER":
        return {
          ...state,
          person: action.person
        }
      case "SET_GENRES_FILTER":
        return {
          ...state,
          genres: action.genresArray
        }
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
