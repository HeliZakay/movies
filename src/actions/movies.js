import uuid from "uuid";
// ADD_MOVIE
export const addMovie = (
    {
      movieName="",
      personName="",
      score="0",
      content="",
      createdAt="0"
    } = {}
  ) => ({
    type: 'ADD_MOVIE',
    movie: {
      id: uuid(),
      movieName,
      personName,
      score,
      content,
      createdAt
    }
  });


// EDIT_MOVIE
export const editMovie = (id, updates) => ({
  type: 'EDIT_MOVIE',
  id,
  updates
});


  // REMOVE_MOVIE
  export const removeMovie = ({ id } = {}) => ({
    type: 'REMOVE_MOVIE',
    id
  });
  