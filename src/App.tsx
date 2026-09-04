import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  Alphabet = 'alphabet',
  Length = 'length',
}

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

export const App: React.FC = () => {
  const goods = [...goodsFromServer];
  const [sortBy, setSortBy] = useState<SortType | null>(null);
  const [reversed, setReversed] = useState<boolean>(false);

  const isSorted = sortBy !== null || reversed;

  switch (sortBy) {
    case SortType.Alphabet:
      goods.sort((word1, word2) => word1.localeCompare(word2));
      break;
    case SortType.Length:
      goods.sort((word1, word2) => word1.length - word2.length);
      break;
    default:
      break;
  }

  if (reversed) {
    goods.reverse();
  }

  const handleReset = () => {
    setSortBy(null);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy === SortType.Alphabet ? '' : 'is-light'}`}
          onClick={() => setSortBy(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy === SortType.Length ? '' : 'is-light'}`}
          onClick={() => setSortBy(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>
        {isSorted && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
