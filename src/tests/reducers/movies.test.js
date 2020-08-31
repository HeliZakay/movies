import moviesReducer from "../../reducers/movies";
import movies from "../fixtures/movies";

test("should set default state", () => {
    const state = moviesReducer(undefined, {type: "@@INIT"});
    expect(state).toEqual([]);
});


test("should remove movie by id", () => {
    const state = moviesReducer(movies, {type: "REMOVE_MOVIE", id: movies[1].id});
    expect(state).toEqual([movies[0], movies[2]]);
});


test("should not remove movie if id not found", () => {
    const state = moviesReducer(movies, {type: "REMOVE_MOVIE", id: "-1"});
    expect(state).toEqual(movies);
});

test("should add movie", () => {
    const newMovie = {
        id: "rsdt",
        movieName: "Toy Story"
    };
    const state = moviesReducer(movies, {type: "ADD_MOVIE", movie: newMovie});
    expect(state).toEqual([...movies, newMovie]);
});


test("should edit movie", () => {
    const updates = {
        movieName: "Tarzan",
        personName: "Heli"
    }
    const updatedMovie = {
        ...movies[0],
        ...updates
    }
    const state = moviesReducer(movies, 
        {type: "EDIT_MOVIE",
        id:movies[0].id,
        updates
    });
    expect(state[0]).toEqual(updatedMovie);
});

test("shouldn't edit movie when id not found", () => {
    const updates = {
        movieName: "Tarzan",
        personName: "Heli"
    }
    const state = moviesReducer(movies, 
        {type: "EDIT_MOVIE",
        id:"-1",
        updates
    });
    expect(state).toEqual(movies);
});

test("should add movie to watch list", () => {
    const state = moviesReducer(movies, {type: "ADD_MOVIE_TO_WATCH_LIST", id: movies[1].id});
    expect(state[1].watchList).toEqual(true);
});

test("should remove movie from watch list", () => {
    const beforeState= moviesReducer(movies, {type: "ADD_MOVIE_TO_WATCH_LIST", id: movies[1].id});
    expect(beforeState[1].watchList).toEqual(true);
    const afterState = moviesReducer(movies, {type: "REMOVE_MOVIE_FROM_WATCH_LIST", id: movies[1].id});
    expect(afterState[1].watchList).toEqual(false);
});



