import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { Good } from './Types/Good';
import { SortType } from './Types/SortType';

export const goodsFromServer: Good[] = [
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
  const initialGoods: Good[] = [...goodsFromServer];

  const [goods, setGoods] = useState(initialGoods);
  const [sortField, setSortField] = useState(SortType.Reset);
  const [isReversed, setIsReversed] = useState(false);

  const sortGoods = (type: SortType) => {
    const sorted = [...initialGoods];

    switch (type) {
      case SortType.Alphabet:
        sorted.sort((a, b) => a.localeCompare(b));
        break;
      case SortType.Length:
        sorted.sort((a, b) => a.length - b.length);
        break;
      case SortType.Reset:
        break;
    }

    if (isReversed) {
      sorted.reverse();
    }

    setGoods(sorted);
    setSortField(type);
  };

  const reverseGoods = () => {
    setGoods([...goods].reverse());
    setIsReversed(prev => !prev);
  };

  const resetGoods = () => {
    setGoods(initialGoods);
    setSortField(SortType.Reset);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.Alphabet ? '' : 'is-light'}`}
          onClick={() => sortGoods(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SortType.Length ? '' : 'is-light'}`}
          onClick={() => sortGoods(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {(sortField !== SortType.Reset || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
