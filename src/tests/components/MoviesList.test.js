import React from "react";
import {shallow} from "enzyme";
import {MoviesList} from "../../components/MoviesList";
import movies from "../fixtures/movies";

test("should render MoviesList with movies", () => {
    const wrapper = shallow(<MoviesList movies={movies} />);
    expect(wrapper).toMatchSnapshot();
});

test("should not render MoviesList if there are no movies", () => {
    const wrapper = shallow(<MoviesList movies={[]} />);
    expect(wrapper).toMatchSnapshot();
});