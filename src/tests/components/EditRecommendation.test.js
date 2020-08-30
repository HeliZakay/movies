import React from "react";
import {shallow} from "enzyme";
import {EditRecommendation} from "../../components/EditRecommendation";
import movies from "../fixtures/movies";

let editMovie, removeMovie, history, wrapper;

beforeEach(() => {
    editMovie = jest.fn();
    removeMovie = jest.fn();
    history = { push: jest.fn() };
    wrapper =shallow(<EditRecommendation 
    editMovie={editMovie}
    removeMovie={removeMovie}
    history={history} 
    movie={movies[2]}
    />);
});

test("should render EditRecommendation correctly", () => {
    expect(wrapper).toMatchSnapshot();
});


test("should handle editMovie", () => {
    wrapper.find("RecommendationForm").prop("onSubmit")(movies[2]);
    expect(history.push).toHaveBeenLastCalledWith("/");
    expect(editMovie).toHaveBeenLastCalledWith(movies[2].id, movies[2]);
});

test("should handle removeMovie", () => {
    wrapper.find("button").simulate("click");
    expect(history.push).toHaveBeenLastCalledWith("/");
    expect(removeMovie).toHaveBeenLastCalledWith({
        id: movies[2].id
    });
});