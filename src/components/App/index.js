import React from 'react';
import Game from '../Game/';
import {AppConst} from '../../constants/';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>{AppConst.TITLE}</h2>
      </header>
      <Game />
    </div>
  );
}

export default App;
