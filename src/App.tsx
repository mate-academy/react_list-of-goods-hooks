import React from 'react';
import './App.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export const App: React.FC = () => (
  <div className="App">
    <button type="button">
      Start
    </button>

    <button type="button">
      Sort alphabetically
    </button>

    <button type="button">
      Sort by length
    </button>

    <button type="button">
      Reverse
    </button>

    <button type="button">
      Reset
    </button>

    <ul className="Goods">
      <li className="Goods__item">Dumplings</li>
      <li className="Goods__item">Carrot</li>
      <li className="Goods__item">Eggs</li>
      <li className="Goods__item">...</li>
    </ul>
  </div>
);
