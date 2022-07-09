import React from 'react';
import './App.scss';
import { ProductList } from './components/ProductList';

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
    <ProductList products={goodsFromServer} />
  </div>
);

export default App;
