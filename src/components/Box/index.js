import React from 'react';
import PropTypes from 'prop-types';
import './Box.css';

function Box(props) {
    const _isDisabled = () => {
        return props.value || props.gameOver
    };
    return (<button className="box-btn" onClick={props.onClick} disabled={_isDisabled()}>{props.value}</button>);
}


Box.propTypes = {
    onClick: PropTypes.func.isRequired,
    gameOver: PropTypes.bool.isRequired,
    value: PropTypes.string
};

export default Box;
