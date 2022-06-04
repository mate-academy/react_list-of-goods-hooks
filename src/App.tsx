import React from 'react';
import './App.css';
import { ListOfGoods } from './components/ListOfGoods';

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
  <ListOfGoods goodsFromServer={goodsFromServer} />
);

export default App;
