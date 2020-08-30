import React from "react";
import { shallow } from "enzyme";
import Homepage from "../../components/Homepage";

test("should render Homepage correctly", () => {
    const wrapper = shallow(<Homepage />);
    expect(wrapper).toMatchSnapshot();
});