import React from "react";
import {shallow} from "enzyme";
import {AddRecommendation} from "../../components/AddRecommendation";
import movies from "../fixtures/movies";

let startAddMovie, history, wrapper;

beforeEach(() => {
    startAddMovie = jest.fn();
    history = { push: jest.fn() };
    wrapper =shallow(<AddRecommendation startAddMovie={startAddMovie} history={history} />);
});

test("should render AddRecommendation correctly", () => {
    expect(wrapper).toMatchSnapshot();
});

test("should handle onSubmit", () => {
    wrapper.find("RecommendationForm").prop("onSubmit")(movies[1]);
    expect(history.push).toHaveBeenLastCalledWith("/");
    expect(startAddMovie).toHaveBeenLastCalledWith(movies[1]);
});