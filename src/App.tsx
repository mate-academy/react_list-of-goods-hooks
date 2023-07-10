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
  ALPHABET = 'alphabet',
  LENGTH = 'length',
  DEFAULT = '',
}

interface FilterParams {
  sortType: SortType;
  isReversed: boolean;
}

function getSortedGoods(
  goods: string[],
  { sortType, isReversed }:FilterParams,
) {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.ALPHABET:
          return good1.localeCompare(good2);

        case SortType.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getSortedGoods(
    goodsFromServer, { sortType, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortType(SortType.ALPHABET)}
          className={cn('button is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortType(SortType.LENGTH)}
          className={cn('button is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(prevValue => !prevValue)}
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(SortType.DEFAULT);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {
          visibleGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))
        }
      </ul>
    </div>
  );
};
