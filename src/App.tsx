import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
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

export const App: React.FC = () => {
  const [currentGoods, setCurrentGoods] = useState<string[]>(goodsFromServer);

  enum SortType {
    alphabet = 'alphabet',
    length = 'length',
    reverse = 'reverse',
    reset = 'reset',
  }

  const sortFunction = (goods: string[], sortBy: SortType) => {
    if (sortBy === SortType.alphabet) {
      setCurrentGoods([...goods].sort((a, b) => a.localeCompare(b)));
    }

    if (sortBy === SortType.length) {
      setCurrentGoods([...goods].sort((a, b) => a.length - b.length));
    }

    if (sortBy === SortType.reverse) {
      setCurrentGoods([...goods].reverse());
    }

    if (sortBy === SortType.reset) {
      setCurrentGoods([...goodsFromServer]);
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className="button is-info is-light"
          onClick={() => sortFunction(currentGoods, 'alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="button is-success is-light"
          onClick={() => sortFunction(currentGoods, 'length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-warning is-light"
          onClick={() => sortFunction(currentGoods, 'reverse')}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => sortFunction(currentGoods, 'reset')}
        >
          Reset
        </button>
      </div>

      <ul>
        {currentGoods.map((item: string) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};
