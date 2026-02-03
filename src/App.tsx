import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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
  Default = '',
  Length = 'length',
  Alphabetically = 'alphabetically',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortBy, setSortBy] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const sortAlphabetically = () => {
    setGoods([...goods].sort((a, b) => a.localeCompare(b)));
    setSortBy(SortType.Alphabetically);
  };

  const sortByLength = () => {
    setGoods([...goods].sort((a, b) => a.length - b.length));

    setSortBy(SortType.Length);
  };

  const toggleReverse = () => {
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setGoods(goodsFromServer);
    setSortBy(SortType.Default);
    setIsReversed(false);
  };

  const goodsToShow = [...goods];

  if (isReversed) {
    goodsToShow.reverse();
  }

  const isChanged =
    JSON.stringify(goodsToShow) !== JSON.stringify(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => sortAlphabetically()}
          type="button"
          className={`button is-info ${sortBy === SortType.Alphabetically ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => sortByLength()}
          type="button"
          className={`button is-success ${sortBy === SortType.Length ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => toggleReverse()}
          type="button"
          className={`button is-warning ${isReversed === true ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {isChanged === true && (
          <button
            onClick={() => reset()}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsToShow.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}

        {/* <li data-cy="Good">Carrot</li>

        <li data-cy="Good">Eggs</li>

        <li data-cy="Good">Ice cream</li>

        <li data-cy="Good">Apple</li>

        <li data-cy="Good">...</li> */}
      </ul>
    </div>
  );
};
