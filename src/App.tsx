import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortBy {
  Alphabet = 'alphabet',
  Length = 'length',
}

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

const getSortedGoods = (
  goods: string[],
  sortBy: SortBy,
  isReversed: boolean,
): string[] => {
  const sortedGoods = [...goods];

  if (sortBy === SortBy.Alphabet) {
    sortedGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortBy === SortBy.Length) {
    sortedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortBy | ''>('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getSortedGoods(
    goodsFromServer,
    sortBy as SortBy,
    isReversed,
  );

  const reset = () => {
    setSortBy('');
    setIsReversed(false);
  };

  const toggleReverse = () => {
    setIsReversed(prevState => !prevState);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy === SortBy.Alphabet ? '' : 'is-light'}`}
          onClick={() => setSortBy(SortBy.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy === SortBy.Length ? '' : 'is-light'}`}
          onClick={() => setSortBy(SortBy.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
          <button type="button" className="button is-danger" onClick={reset}>
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
