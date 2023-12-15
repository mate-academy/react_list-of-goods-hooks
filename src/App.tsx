import React, { useState } from 'react';
import cn from 'classnames';
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

enum SortOptions {
  ALPHABETIC = 'alphabetic',
  LENGTH = 'length',
  DEFAULT = '',
}

type SortFields = {
  sortBy: SortOptions
  isReversed: boolean
};

const getPrepareGoods = (
  goods: string[],
  {
    sortBy,
    isReversed,
  }: SortFields,
) => {
  const preparedGoods = [...goods];

  if (sortBy) {
    preparedGoods.sort((a, b) => {
      switch (sortBy) {
        case SortOptions.ALPHABETIC:
          return a.localeCompare(b);

        case SortOptions.LENGTH:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortOptions.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);

  const isOptionsModified = sortBy !== SortOptions.DEFAULT || isReversed;

  const preparedGoods = getPrepareGoods(goodsFromServer, {
    sortBy,
    isReversed,
  });

  const handleReset = () => {
    setSortBy(SortOptions.DEFAULT);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SortOptions.ALPHABETIC,
          })}
          onClick={() => setSortBy(SortOptions.ALPHABETIC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== SortOptions.LENGTH,
          })}
          onClick={() => setSortBy(SortOptions.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {isOptionsModified && (
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
        {preparedGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
