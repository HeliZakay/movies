import filtersReducer from "../../reducers/filters";

test("should setup default filter values", () => {
    const state = filtersReducer(undefined, {type: "@@INIT"});
    expect(state).toEqual({
        text:"",
        sortBy: "date",
        person: ""
    });
});

test("should set sortBy to date", () => {
    const state = filtersReducer(undefined, {type: "SORT_BY_DATE"});
    expect(state.sortBy).toBe("date");
});

test("should set sortBy to score", () => {
    const currentState = {
        text: "",
        person:"",
        sortBy: "score"
    }
    const state = filtersReducer(undefined, {type: "SORT_BY_SCORE"});
    expect(state.sortBy).toBe("score");
});

test("should set text to the given text", () => {
    const state = filtersReducer(undefined, {type: "SET_TEXT_FILTER", text: "movieName"});
    expect(state.text).toBe("movieName");
});

test("should set person to the given person", () => {
    const state = filtersReducer(undefined, {type: "SET_PERSON_FILTER", person: "personName"});
    expect(state.person).toBe("personName");
});
