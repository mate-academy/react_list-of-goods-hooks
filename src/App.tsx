import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

const goodsFromServer = [
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

enum SortBy {
  None,
  Alphabet,
  Length,
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.None);
  const [isReverse, setIsReverse] = useState(false);

  const result = [...goodsFromServer];

  if (sortBy === SortBy.Alphabet) {
    result.sort((a, b) => a.localeCompare(b));
  }

  if (sortBy === SortBy.Length) {
    result.sort((a, b) => a.length - b.length);
  }

  if (isReverse) {
    result.reverse();
  }

  const goods = result;

  const reset = () => {
    setSortBy(SortBy.None);
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SortBy.Alphabet,
          })}
          onClick={() => setSortBy(SortBy.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== SortBy.Length,
          })}
          onClick={() => setSortBy(SortBy.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => setIsReverse(prev => !prev)}
        >
          Reverse
        </button>

        {(sortBy !== SortBy.None || isReverse) && (
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
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
