import React from 'react';
import {mount} from 'enzyme';
import Board from '../Board/';
import {AppConst} from '../../constants/';


describe("<Board /> component", () => {
  let wrapper, instance;
  const changeActivePlayerMock = () => {
    const activePlayer = (wrapper.props().activePlayer === AppConst.PLAYER_X_NAME) ? AppConst.PLAYER_O_NAME : AppConst.PLAYER_X_NAME;
    wrapper.setProps({
        ...wrapper.props(),
        activePlayer: activePlayer
    });
  };
 
  beforeEach(() => {
    const props = {
      activePlayer: AppConst.PLAYER_X_NAME,
      changeActivePlayer: jest.fn(changeActivePlayerMock)
    };
    wrapper = mount(<Board {...props} />);
    instance = wrapper.instance();
  });
  
  it("Should have 9 boxes in the board", () => {
    expect(wrapper.find("ul li").length).toEqual(AppConst.TOTAL_BOXES);
  });

  it("Should render 9 buttons in the board", () => {
    expect(wrapper.find("ul li button").length).toEqual(AppConst.TOTAL_BOXES);
  });

  it("Should call the fill the box method", () => {
    const spy = jest.spyOn(instance, "fillTheBox");
    instance.forceUpdate();

    wrapper.find("ul li button").at(0).simulate("click");
    
    expect(spy).toHaveBeenCalled();
  });

  it("Should update the filledBoxes list with player 'X' for the first time", () => {
    wrapper.find("ul li button").at(0).simulate("click");
    
    expect(wrapper.state().filledBoxes[0]).toEqual(AppConst.PLAYER_X_NAME);
  });

  it("Should display the box text as X on first click of the board", () => {
    const btn = wrapper.find("ul li button").at(5);
    
    btn.simulate("click");
    
    expect(btn.text()).toEqual(AppConst.PLAYER_X_NAME);
  });

  it("Should have the activePlayer prop of type string", () => {
    expect(typeof wrapper.props().activePlayer).toEqual("string");
  });

  it("Should update the filled box with active player", () => {
    const btn = wrapper.find("ul li button").at(4);

    btn.simulate("click");

    expect(wrapper.state().filledBoxes[4]).toEqual(AppConst.PLAYER_X_NAME);
  });

  it("changeActivePlayer to be called when the box filled", () => {
    const btn = wrapper.find("ul li button").at(3);

    instance.forceUpdate();

    btn.simulate("click");

    expect(instance.props.changeActivePlayer).toHaveBeenCalled();
  });
  
  it("Should fill the box with alternate player name for each click", () => {
    const btnAtIndex3 = wrapper.find("ul li button").at(3);

    btnAtIndex3.simulate("click");
    
    expect(wrapper.state().filledBoxes[3]).toEqual(AppConst.PLAYER_X_NAME);

    const btnAtIndex2 = wrapper.find("ul li button").at(2);

    btnAtIndex2.simulate("click");
    
    expect(wrapper.state().filledBoxes[2]).toEqual(AppConst.PLAYER_O_NAME);
  });

  it("Can be filled only once in the box", () => {
    const btn = wrapper.find("ul li button").at(0);

    btn.simulate("click");

    expect(instance.state.filledBoxes[0]).toEqual(AppConst.PLAYER_X_NAME);

    btn.simulate("click");

    expect(instance.state.filledBoxes[0]).toEqual(AppConst.PLAYER_X_NAME);

  });

  it("Player wins when a row completed by the player", () => {
    const btnList = wrapper.find("ul li button");
    const box1 = btnList.at(1);
    const box2 = btnList.at(2);
    const box3 = btnList.at(3);
    const box4 = btnList.at(4);
    const box5 = btnList.at(5);

    box3.simulate("click");
    expect(instance.state.filledBoxes[3]).toEqual(AppConst.PLAYER_X_NAME);
    
    box1.simulate("click");    
    expect(instance.state.filledBoxes[1]).toEqual(AppConst.PLAYER_O_NAME);
    
    box4.simulate("click");
    expect(instance.state.filledBoxes[4]).toEqual(AppConst.PLAYER_X_NAME);
    
    box2.simulate("click");
    expect(instance.state.filledBoxes[2]).toEqual(AppConst.PLAYER_O_NAME);
    
    box5.simulate("click");
    expect(instance.state.filledBoxes[5]).toEqual(AppConst.PLAYER_X_NAME);
    
    expect(instance.state.winner).toEqual(AppConst.PLAYER_X_NAME);

  });

});
