import './App.scss';
import { FC } from 'react';

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

export const App: FC = () => (
  <div className="App">
    <h1>Goods</h1>

    {goodsFromServer.length}
  </div>
);
