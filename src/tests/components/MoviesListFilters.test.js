import React from "react";
import {shallow} from "enzyme";
import {MoviesListFilters} from "../../components/MoviesListFilters";
import {filters,altFilters} from "../fixtures/filters";

let setTextFilter, setPersonFilter, sortByDate, sortByScore, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    setPersonFilter = jest.fn();
    sortByScore = jest.fn();
    sortByDate = jest.fn();
    wrapper = shallow(
        <MoviesListFilters 
        filters={filters}
        setTextFilter={setTextFilter}
        setPersonFilter={setPersonFilter}
        sortByDate={sortByDate}
        sortByScore={sortByScore}
        />
        );
});

test("should render MoviesListFilters correctly", () => {
    expect(wrapper).toMatchSnapshot();
});


test("should render MoviesListFilters with alt data correctly", () => {
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});

test("should handle text change", () => {
    const value = "tarazan";
    wrapper.find("input").at(0).simulate("change", {
        target: {value}
    });
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test("should handle person change", () => {
    const value = "heli";
    wrapper.find("input").at(1).simulate("change", {
        target: {value}
    });
    expect(setPersonFilter).toHaveBeenLastCalledWith(value);
});


test("should sort by date ", () => {
    const value = "date";
    wrapper.setProps({
        filters: altFilters
    });
    wrapper.find("select").simulate("change", {
        target: {value}
    });
    expect(sortByDate).toHaveBeenCalled();
});



test("should sort by score ", () => {
    const value = "score";
    wrapper.find("select").simulate("change", {
        target: {value}
    });
    expect(sortByScore).toHaveBeenCalled();
});


