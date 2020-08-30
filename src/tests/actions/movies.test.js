import {addMovie, editMovie, removeMovie} from "../../actions/movies";
import moment from "moment";

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
    const movieData = {
        personName: "Heli",
        movieName: "Avater",
        content: "Weird movie",
        score: 10,
        createdAt: moment()
    };
    const action = addMovie(movieData);
    expect(action).toEqual({
        type: "ADD_MOVIE",
        movie: {
            ...movieData,
            id: expect.any(String)
        }
    });
});
test("should setup add movie action object with default values", () => {
    const action = addMovie();
    expect(action).toEqual({
        type: "ADD_MOVIE",
        movie: {
            personName: "",
            movieName: "",
            content: "",
            score: 0,
            createdAt: 0,
            id: expect.any(String)
        }
    });
});



