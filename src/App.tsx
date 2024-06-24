import React, { useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

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
  Alphabetically = 'alphabetically',
  Length = 'length',
  None = 'none',
}

export const App: React.FC = () => {
  const [isReversed, setReversed] = useState<boolean>(false);
  const [sortType, setSortType] = useState<SortType>(SortType.None);

  const reverseGoods = () => {
    setReversed(!isReversed);
  };

  const resetGoods = () => {
    setSortType(SortType.None);
    setReversed(false);
  };

  const isResetVisible = sortType !== SortType.None || isReversed;

  const newGoods = useMemo(() => {
    const sortedGoods = [...goodsFromServer];

    if (sortType === SortType.Alphabetically) {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (sortType === SortType.Length) {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  }, [sortType, isReversed]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== SortType.Alphabetically ? 'is-light' : ''}`}
          onClick={() => setSortType(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== SortType.Length ? 'is-light' : ''}`}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {isResetVisible && (
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
        {newGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
