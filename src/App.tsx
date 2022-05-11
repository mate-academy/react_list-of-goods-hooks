import React from 'react';
import { GoodsList } from './GoodsList/GoodsList';
import './App.css';

const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const App: React.FC = () => (
  <div className="App">
    <h1>Goods</h1>
    <GoodsList goodsFromServer={goodsFromServer} />
  </div>
);

export default App;
