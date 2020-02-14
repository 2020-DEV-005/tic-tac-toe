import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Box from '../Box/';
import {AppConst} from '../../constants/';
import './Board.css';

class Board extends Component {
    constructor(props){
        super(props);
        this.state = {
            filledBoxes: []
        };
        this._isGameOver = false;
    }

    _getBoxes = () => {
        const totalBoxes = AppConst.TOTAL_BOXES;
        let boxList = []
        for(let i=0; i<totalBoxes; i++) {
            boxList.push(<li key={i}><Box onClick={this.fillTheBox.bind(this, i)} value={this.getFilledValue(i)} gameOver={this._isGameOver}/></li>);
        }
        return boxList;
    }
    
    getFilledValue = (boxIndex) => {
        return this.state.filledBoxes[boxIndex] || "";
    }

    fillTheBox = (boxIndex) => {
        let filledBoxes = this.state.filledBoxes;
        if(!filledBoxes[boxIndex]  && !this._isGameOver){
            filledBoxes[boxIndex] = this.props.activePlayer;
            this.setState(() => ({
                filledBoxes: filledBoxes
            }));
            this._isGameOver = this._isGameFinished();
            !this._isGameOver && this.props.changeActivePlayer();
        }
    }

    _isGameFinished = () => {
        if(this._isAnyRowCompletedByTheActivePlayer()){
            this.props.setTheWinner();
            return true;
        }
        return false;
    }

    _isAnyRowCompletedByTheActivePlayer = () => {
        let rowsList = AppConst.ROW_START_INDEXES;
        let numOfRows = AppConst.TOTAL_ROWS;
        let isPlayerWin = false;
        for(var i = 0; i < numOfRows; i++) {
            let rowStartIndex = rowsList[i];
            if(this._isRowCompletedByTheActivePlayer(rowStartIndex, )){
                isPlayerWin = true;
                break;
            } 
        }
        return isPlayerWin;
    }

    _isRowCompletedByTheActivePlayer = (rowStartIndex) => {
        const activePlayer = this.props.activePlayer;
        const filledBoxes = this.state.filledBoxes;
        return filledBoxes[rowStartIndex] === activePlayer && filledBoxes[rowStartIndex+1] === activePlayer && filledBoxes[rowStartIndex+2] === activePlayer;
    }

    render = () => {
        return (<ul className="board">
            {this._getBoxes()}
        </ul>);
    }
}

Board.propTypes = {
    activePlayer: PropTypes.string.isRequired,
    changeActivePlayer: PropTypes.func.isRequired,
    setTheWinner: PropTypes.func.isRequired
};

export default Board;
