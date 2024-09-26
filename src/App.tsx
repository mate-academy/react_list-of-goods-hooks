import 'bulma/css/bulma.css';
import cn from 'classnames';
import React, { useState } from 'react';
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
  Default = '',
}

type SortBy = {
  sortBy: SortType;
  isReverse: boolean;
};

const getPrepareGoods = (goods: string[], { sortBy, isReverse }: SortBy) => {
  const prepareGoods: string[] = [...goods];

  if (sortBy) {
    prepareGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);
        case SortType.Length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    prepareGoods.reverse();
  }

  return prepareGoods;
};

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortType.Default);
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods = getPrepareGoods(goodsFromServer, { sortBy, isReverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortBy(SortType.Alphabet)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SortType.Alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortBy(SortType.Length)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReverse(!isReverse)}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
        >
          Reverse
        </button>

        {(sortBy || isReverse) && (
          <button
            onClick={() => {
              setSortBy(SortType.Default);
              setIsReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
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
