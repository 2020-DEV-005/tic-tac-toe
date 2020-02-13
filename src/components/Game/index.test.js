import React from 'react';
import {mount} from 'enzyme';
import Game from './';
import Board from '../Board/';
import {AppConst} from '../../constants/';


describe("<Game/> component", () => {
  let wrapper = mount(<Game />);

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

});
