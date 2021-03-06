import React from 'react';
import {mount} from 'enzyme';
import Game from './';
import Board from '../Board/';
import {AppConst} from '../../constants/';


describe("<Game/> component", () => {
  let wrapper;
  beforeEach( () => {
    wrapper = mount(<Game />);
  });

  it("Player x should be active player by default", () => {
    expect(wrapper.find("h4").text()).toEqual(AppConst.PLAYER +" "+AppConst.PLAYER_X_NAME);
  });

  it("Should render the <Board /> component", () => {
    expect(wrapper.find(Board).length).toEqual(1);
  });

  it("Should render the <Board /> component", () => {
    expect(wrapper.find(Board).length).toEqual(1);
  });

  it("Should send the prop 'activePlayer' to the board component", () => {      
    let board = wrapper.find(Board);
    expect(board.props().activePlayer).not.toBeNull();
  });

  it("Winner should be displayed", () => {
    const btnList = wrapper.find("ul li button");
    const box1 = btnList.at(1);
    const box2 = btnList.at(2);
    const box3 = btnList.at(3);
    const box4 = btnList.at(4);
    const box5 = btnList.at(5);

    box3.simulate("click");
    box1.simulate("click");    
    box4.simulate("click");
    box2.simulate("click");
    box5.simulate("click");
    
    expect(wrapper.find(".win-msg").text()).toEqual(AppConst.PLAYER + " " + AppConst.PLAYER_X_NAME + " " +AppConst.WIN_THE_GAME);
  });

});
