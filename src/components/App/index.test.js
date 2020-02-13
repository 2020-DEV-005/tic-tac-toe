import React from 'react';
import {shallow} from 'enzyme';
import App from './';
import {AppConst} from '../../constants/';


describe("<App/> component", () => {
  let wrapper = shallow(<App/>);

  it("The application should have the correct title", () => {
    expect(wrapper.find("header h2").text()).toEqual(AppConst.TITLE);
  });

});
