// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
  });

  export const setGenresFilter = (genresArray) => ({
    type: "SET_GENRES_FILTER",
    genresArray
  });

// SORT_BY_DATE
export const sortByDate = () => ({
    type: 'SORT_BY_DATE'
  });
  
  // SORT_BY_SCORE
  export const sortByScore = () => ({
    type: 'SORT_BY_SCORE'
  });

  // SET_PERSON_FILTER
  export const setPersonFilter = (person = "") => ({
    type: "SET_PERSON_FILTER",
    person
  });

