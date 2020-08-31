import React from "react";
import {shallow} from "enzyme";
import {WatchList} from "../../components/WatchList";
import movies from "../fixtures/movies";

test("should render MoviesList with movies", () => {
    const wrapper = shallow(<WatchList movies={movies} />);
    expect(wrapper).toMatchSnapshot();
});

test("should not render MoviesList if there are no movies", () => {
    const wrapper = shallow(<WatchList movies={[]} />);
    expect(wrapper).toMatchSnapshot();
});