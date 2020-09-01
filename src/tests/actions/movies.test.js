import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {setMovies, startAddMovie, addMovie, editMovie, removeMovie, addMovieToWatchList, removeMovieFromWatchList} from "../../actions/movies";
import moment from "moment";
import movies from "../fixtures/movies";
import database from "../../firebase/firebase";

const createMockStore = configureMockStore([thunk]);

beforeEach( (done) => {
    const moviesData = {};
    movies.forEach( ({id, content, movieName, personName, score, createdAt, watchList}) => {
        moviesData[id] = {content, movieName, personName, score, createdAt, watchList};
    });
    database.ref("movies").set(moviesData).then( () => done());
});

test("should setup remove movie action object", () => {
    const action = removeMovie({id: "123abc"});
    expect(action).toEqual({
        type: "REMOVE_MOVIE",
        id: "123abc"
    });
});

test("should setup edit movie action object", () => {
    const action = editMovie("123abc", {personName: "Heli"});
    expect(action).toEqual({
        type: "EDIT_MOVIE",
        id: "123abc",
        updates: {personName: "Heli"} 
    });
});

test("should setup add movie action object with provided values", () => {
    const action = addMovie(movies[2]);
    expect(action).toEqual({
        type: "ADD_MOVIE",
        movie: movies[2]
    });
});


// test('should add movie to database and store', (done) => {
//     const store = createMockStore({});
//     const movieData = {
//         movieName: "Tarazan",
//         score: 8,
//         personName: "Dorit",
//         createdAt: moment(4000),
//         content: "Cute",
//         watchList: false
//     };
  
//     store.dispatch(startAddMovie(movieData)).then(() => {
//       const actions = store.getActions();
//       expect(actions[0]).toEqual({
//         type: 'ADD_MOVIE',
//         movie: {
//           id: expect.any(String),
//           ...movieData
//         }
//       });
//       done();
//       return database.ref(`movies/${actions[0].movie.id}`).once('value');
//     }).then((snapshot) => {
//       expect(snapshot.val()).toEqual(movieData);
//       done();
//     });
//   });


// test("should add movie with defaults to database and store", () => {

// });

// test("should setup add movie action object with default values", () => {
//     const action = addMovie();
//     expect(action).toEqual({
//         type: "ADD_MOVIE",
//         movie: {
//             personName: "",
//             movieName: "",
//             content: "",
//             score: 0,
//             createdAt: 0,
//             id: expect.any(String)
//         }
//     });
// });


test("should setup add Movie To Watch List action object", () => {
    const action = addMovieToWatchList("123abc");
    expect(action).toEqual({
        type: "ADD_MOVIE_TO_WATCH_LIST",
        id: "123abc",
    });
});


test("should setup remove movie from watch list action object", () => {
    const action = removeMovieFromWatchList("123abc");
    expect(action).toEqual({
        type: "REMOVE_MOVIE_FROM_WATCH_LIST",
        id: "123abc",
    });
});



test("should setup set movies action object with data", () => {
    const action = setMovies(movies);
    expect(action).toEqual({
        type: "SET_MOVIES" ,
        movies
    });
});