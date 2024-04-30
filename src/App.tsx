import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer: string[] = [
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
  const [goodsList, setGoodsList] = useState<string[]>(goodsFromServer);
  const [sortedBy, setSortedBy] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const sortAlphabetically = () => {
    if (isReversed) {
      setGoodsList([...goodsList].sort().reverse());
    } else {
      setGoodsList([...goodsList].sort());
    }

    setSortedBy(SortType.Alphabetically);
  };

  const sortByLength = () => {
    if (isReversed) {
      setGoodsList([...goodsList].sort((a, b) => b.length - a.length));
    } else {
      setGoodsList([...goodsList].sort((a, b) => a.length - b.length));
    }

    setSortedBy(SortType.Length);
  };

  const reversed = () => {
    setGoodsList([...goodsList].reverse());
    setIsReversed(!isReversed);
  };

  const reseted = () => {
    setGoodsList(goodsFromServer);
    setSortedBy(SortType.None);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={sortAlphabetically}
          className={`button is-info  ${sortedBy === SortType.Alphabetically ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortByLength}
          className={`button is-success ${sortedBy === SortType.Length ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reversed}
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {sortedBy !== SortType.None || isReversed ? (
          <button
            type="button"
            onClick={reseted}
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {goodsList.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
