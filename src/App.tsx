/* eslint-disable prettier/prettier */
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
  SORT_NONE = '',
  SORT_ALPHABET = 'alphabet',
  SORT_LENGTH = 'length',
}


function getPreparedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean
) {
  const prepared = [...goods];

  if (sortType === SortType.SORT_ALPHABET) {
    prepared.sort((a, b) => a.localeCompare(b));
  } else if (sortType === SortType.SORT_LENGTH) {
    prepared.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    prepared.reverse();
  }

  return prepared;
}

export const App = () => {
  const [sortType, setSortType] = useState(SortType.SORT_NONE);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortType, isReversed);
  const isOriginalOrder = sortType === SortType.SORT_NONE && !isReversed;

  const reset = () => {
    setSortType(SortType.SORT_NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.SORT_ALPHABET ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.SORT_LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
