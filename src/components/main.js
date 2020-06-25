import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import 'holderjs';

import Player from './player';
import Armory from './armory';
import Markets from './markets';
import Arena from './arena';
import Ticker from './ticker';
import CurrentFight from './current-fight';

export default function Main() {
  return (
    <main>
      <Provider store={store}>
        <Arena></Arena>
        <Ticker></Ticker>
      </Provider>
    </main>
  );
}
