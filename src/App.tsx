import { FC } from 'react';
import './App.css';
import { SortableList } from './components/SortableList';

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

const App: FC = () => (
  <div className="app">
    <h1>Goods</h1>
    <SortableList goods={goodsFromServer} />
  </div>
);

export default App;
