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
  None,
  Alphabet,
  Length,
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const getPreparedGoods = () => {
    const sortedGoods = [...goodsFromServer];

    if (sortField === SortType.Alphabet) {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (sortField === SortType.Length) {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  const reset = () => {
    setSortField(SortType.None);
    setIsReversed(false);
  };

  const visibleGoods = getPreparedGoods();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.Alphabet)}
          type="button"
          className={`button is-info ${sortField !== SortType.Alphabet ? 'is-light' : ''}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.Length)}
          type="button"
          className={`button is-success ${sortField !== SortType.Length ? 'is-light' : ''}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
        >
          Reverse
        </button>

        {(sortField !== SortType.None || isReversed) && (
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
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
