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

enum SortType {
  None = '',
  Alphabetically = 'alphabetically',
  Length = 'length',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const sortGoods = (type: SortType) => {
    const sortedGoods = [...goodsFromServer];

    if (type === SortType.Alphabetically) {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    }

    if (type === SortType.Length) {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    setGoods(isReversed ? sortedGoods.reverse() : sortedGoods);
    setSortType(type);
  };

  const reverseGoods = () => {
    setGoods([...goods].reverse());
    setIsReversed(prev => !prev);
  };

  const resetGoods = () => {
    setGoods([...goodsFromServer]);
    setSortType(SortType.None);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.Alphabetically ? '' : 'is-light'}`}
          onClick={() => sortGoods(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortType === SortType.Length ? '' : 'is-light'}`}
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

        {goods.toString() !== goodsFromServer.toString() && (
          <button
            type="button"
            className="button is-danger"
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
