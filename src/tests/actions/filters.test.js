import {setTextFilter, setPersonFilter, sortByDate, sortByScore} from "../../actions/filters";

test("should generate set text filter action object with text passed", ()=> {
    const action = setTextFilter("mulan");
    expect(action).toEqual({
        type: "SET_TEXT_FILTER",
        text: "mulan"
    });
});

test("should generate set text filter action object with empty string", ()=> {
    const action = setTextFilter();
    expect(action).toEqual({
        type: "SET_TEXT_FILTER",
        text: ""
    });
});


test("should generate set person filter action object with person name passed", ()=> {
    const action = setPersonFilter("Moshe");
    expect(action).toEqual({
        type: "SET_PERSON_FILTER",
        person: "Moshe"
    });
});


test("should generate set person filter action object with no name passed", ()=> {
    const action = setPersonFilter();
    expect(action).toEqual({
        type: "SET_PERSON_FILTER",
        person: ""
    });
});


test("should generate sort by date filter action object", ()=> {
    const action = sortByDate();
    expect(action).toEqual({
        type: "SORT_BY_DATE",
    });
});


test("should generate sort by score filter action object", ()=> {
    const action = sortByScore();
    expect(action).toEqual({
        type: "SORT_BY_SCORE",
    });
});

