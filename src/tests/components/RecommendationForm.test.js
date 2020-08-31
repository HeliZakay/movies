import React from "react";
import {shallow} from "enzyme";
import RecommendationForm from "../../components/RecommendationForm";
import movies from "../fixtures/movies";
import moment from "moment";

test("should render RecommendationForm correctly", () => {
    const wrapper = shallow(<RecommendationForm />);
    expect(wrapper).toMatchSnapshot();
});

test("should render RecommendationForm correctly with expense data", () => {
    const wrapper = shallow(<RecommendationForm movie={movies[1]} />);
    expect(wrapper).toMatchSnapshot();
});

test("should render error for invalid form submission", () => {
    const wrapper = shallow(<RecommendationForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find("form").simulate("submit", {
        preventDefault: () => {}
    });
    expect(wrapper.state("error").length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test("should set movieName on input change", () => {
    const value = "new movie name";
    const wrapper = shallow(<RecommendationForm />);
    wrapper.find("input").at(0).simulate("change", {
        target: { value }
    });
    expect(wrapper.state("movieName")).toBe(value);
});

test("should set content on textarea change", () => {
    const value = "new content";
    const wrapper = shallow(<RecommendationForm />);
    wrapper.find("textarea").simulate("change", {
        target: { value }
    });
    expect(wrapper.state("content")).toBe(value);
});

test("should set personName on input change", () => {
    const value = "new person name";
    const wrapper = shallow(<RecommendationForm />);
    wrapper.find("input").at(2).simulate("change", {
        target: { value }
    });
    expect(wrapper.state("personName")).toBe(value);
});


test("should set score on input change", () => {
    const value = 9;
    const wrapper = shallow(<RecommendationForm />);
    wrapper.find("input").at(1).simulate("change", {
        target: { value }
    });
    expect(wrapper.state("score")).toBe(value);
});

test("should call onSubmit prop for valid form submission", () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<RecommendationForm movie={movies[0]} onSubmit={onSubmitSpy} />);
    wrapper.find("form").simulate("submit", {
        preventDefault: () => {}
    });
    expect(wrapper.state("error")).toBe("");
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        content: movies[0].content,
        movieName: movies[0].movieName,
        personName: movies[0].personName,
        score: movies[0].score,
        createdAt: movies[0].createdAt,
        watchList: movies[0].watchList
    });
});