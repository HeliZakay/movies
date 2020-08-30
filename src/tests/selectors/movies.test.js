import selectMovies from "../../selectors/movies";
import movies from "../fixtures/movies";

test("should filter by text value", () => {
    const filters = {
        text: "got",
        sortBy: "date",
        person: ""
    };
    const result = selectMovies(movies, filters);
    expect(result).toEqual([movies[0], movies[1]]);
    
});

test("should filter by person value", () => {
    const filters = {
        text: "",
        sortBy: "date",
        person: "Heli"
    };
    const result = selectMovies(movies, filters);
    expect(result).toEqual([movies[2]]);
    
});

test("should sort by date", () => {
    const filters = {
        text: "",
        sortBy: "date",
        person: ""
    };
    const result = selectMovies(movies, filters);
    expect(result).toEqual([movies[0], movies[2], movies[1]]);
});


test("should sort by score", () => {
    const filters = {
        text: "",
        sortBy: "score",
        person: ""
    };
    const result = selectMovies(movies, filters);
    expect(result).toEqual([movies[1], movies[0], movies[2]]);
});