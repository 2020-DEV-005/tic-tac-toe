import React from 'react';
import {shallow} from 'enzyme';
import Box from '../Box/';

describe("<Box /> component", () => {
  let wrapper;
  beforeEach( () => {
    wrapper = shallow(<Box onClick={jest.fn()} />);
  });

  it("Should have button element", () => {
    expect(wrapper.find("button").length).toEqual(1);
  });

  it("Should have the onClick prop of type function", () => {
    expect(wrapper.props().onClick.constructor.name).toEqual("Function");
  });

});
