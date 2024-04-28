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
  ByAlphabet = 'alphabet',
  ByLength = 'length',
}

type SortBy = {
  sortBy: SortType | string;
  isReverse: boolean;
};

const getPrepareGoods = (goods: string[], { sortBy, isReverse }: SortBy) => {
  const prepareGoods: string[] = [...goods];

  if (sortBy) {
    prepareGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SortType.ByAlphabet:
          return good1.localeCompare(good2);
        case SortType.ByLength:
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
  const [sortBy, setSortBy] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods = getPrepareGoods(goodsFromServer, { sortBy, isReverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortBy(SortType.ByAlphabet)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SortType.ByAlphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortBy(SortType.ByLength)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== SortType.ByLength,
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
              setSortBy('');
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
        <ul>
          {visibleGoods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
