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
  alphabetically = 'alphabetically',
  length = 'length',
  default = '',
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.default);
  const [isReversed, setIsReversed] = useState(false);
  const [goods, setGoods] = useState(goodsFromServer);

  const sortAlphabetically = () => {
    setSortBy(SortType.alphabetically);
    setGoods(prev => prev.toSorted((a, b) => a.localeCompare(b)));
  };

  const sortByLength = () => {
    setSortBy(SortType.length);
    setGoods(prev => prev.toSorted((a, b) => a.length - b.length));
  };

  const reverse = () => {
    setIsReversed(prev => !prev);
    setGoods(prev => prev.toReversed());
  };

  const reset = () => {
    setSortBy(SortType.default);
    setIsReversed(false);
    setGoods(goodsFromServer);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortAlphabetically}
          type="button"
          className={`button is-info ${sortBy === SortType.alphabetically ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={`button is-success ${sortBy === SortType.length ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
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
