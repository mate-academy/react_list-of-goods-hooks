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
  Alphabet = 'alphabet',
  Length = 'length',
  None = 'none',
}

function getPreparedGoods(
  goods: string[],
  sortBy: SortType,
  isReversed: boolean,
): string[] {
  const visibleGoods = [...goods];

  switch (sortBy) {
    case SortType.Alphabet:
      visibleGoods.sort((goodA, goodB) => goodA.localeCompare(goodB));
      break;

    case SortType.Length:
      visibleGoods.sort((goodA, goodB) => goodA.length - goodB.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const preparedGoods = getPreparedGoods(goodsFromServer, sortBy, isReversed);
  const isChanged = sortBy !== SortType.None || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortBy === SortType.Alphabet
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setSortBy(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortBy === SortType.Length
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSortBy(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(current => !current)}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(SortType.None);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
