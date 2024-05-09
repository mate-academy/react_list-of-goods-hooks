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

function getGoods(
  goods: string[],
  {
    sortButton,
    isReversed,
  }: {
    sortButton: SortType;
    isReversed: boolean;
  },
) {
  const safeArray = [...goods];

  switch (sortButton) {
    case SortType.Alphabet:
      safeArray.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.Length:
      safeArray.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    safeArray.reverse();
  }

  return safeArray;
}

export const App: React.FC = () => {
  const [value, setValue] = useState(SortType.None);
  const [isReversed, setReverse] = useState(false);

  const sortedGoods = getGoods(goodsFromServer, {
    sortButton: value,
    isReversed: isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info 
            ${value !== SortType.Alphabet ? 'is-light' : ''}`}
          onClick={() => setValue(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${value !== SortType.Length ? 'is-light' : ''}`}
          onClick={() => setValue(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={() => setReverse(!isReversed)}
        >
          Reverse
        </button>

        {(isReversed || value !== SortType.None) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setValue(SortType.None);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
