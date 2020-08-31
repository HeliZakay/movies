import React from "react";
import {shallow} from "enzyme";
import movies from "../fixtures/movies";
import {MovieCard} from "../../components/MovieCard";


test("should render MovieCard with movie", () => {
    const wrapper = shallow(<MovieCard {...movies[0]} />);
    expect(wrapper).toMatchSnapshot();
});