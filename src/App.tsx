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

enum SortType {
  SORT_FILED_ALPHABET = 'alphabet',
  SORT_FILED_LENGTH = 'length',
  SORT_FILED_DEFAULT = '',
}

function getPreparedGoods(
  goods: string[],
  sortFielde: string,
  isReverse: boolean,
) {
  const preparedGoods = [...goods];

  if (sortFielde) {
    preparedGoods.sort((good1, good2) => {
      switch (sortFielde) {
        case SortType.SORT_FILED_ALPHABET:
          return good1.localeCompare(good2);

        case SortType.SORT_FILED_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortFielde, setSortFielde] = useState(SortType.SORT_FILED_DEFAULT);
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortFielde, isReverse);
  const reverseGood = () => {
    setIsReverse(!isReverse);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortFielde !== SortType.SORT_FILED_ALPHABET,
          })}
          onClick={() => setSortFielde(SortType.SORT_FILED_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortFielde !== SortType.SORT_FILED_LENGTH,
          })}
          onClick={() => setSortFielde(SortType.SORT_FILED_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reverseGood}
          className={cn('button', 'is-warning', {
            'is-light': isReverse !== true,
          })}
        >
          Reverse
        </button>

        {(sortFielde !== '' || isReverse) && (
          <button
            onClick={() => {
              setSortFielde(SortType.SORT_FILED_DEFAULT);
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
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
