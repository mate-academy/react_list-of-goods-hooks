import React, { useState } from 'react';
import './App.scss';

const goods: string[] = [
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
  None = 'NONE',
  Alphabet = 'ALPHABET',
  Length = 'LENGTH',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const preparedGoods = [...goods];

  if (sortType === SortType.Alphabet) {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === SortType.Length) {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          data-cy="SortAlphabetically"
          className={
            sortType === SortType.Alphabet ? 'button' : 'button is-light'
          }
          onClick={() => setSortType(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          data-cy="SortByLength"
          className={
            sortType === SortType.Length ? 'button' : 'button is-light'
          }
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          data-cy="ReverseButton"
          className={isReversed ? 'button' : 'button is-light'}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortType !== SortType.None || isReversed) && (
          <button
            type="button"
            data-cy="ResetButton"
            className="button is-danger"
            onClick={() => {
              setSortType(SortType.None);
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
