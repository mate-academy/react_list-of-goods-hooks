import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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
  SORT_BY_ALPHABET = 'Alphabet',
  SORT_BY_LENGTH = 'Length',
  DEFAULT = '',
}

function getPreparedGoods(
  goodsArray: string[],
  sortField: SortType,
  isReversed = false,
) {
  const preparedGoods = [...goodsArray];

  if (sortField) {
    preparedGoods.sort((arg1, arg2) => {
      switch (sortField) {
        case SortType.SORT_BY_ALPHABET:
          return arg1.localeCompare(arg2);
        case SortType.SORT_BY_LENGTH:
          return arg1.length - arg2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);

  const isActive = sortField || isReversed;

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);

  const handleResetButtonClick = () => {
    setSortField(SortType.DEFAULT);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.SORT_BY_ALPHABET,
          })}
          onClick={() => setSortField(SortType.SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.SORT_BY_LENGTH,
          })}
          onClick={() => setSortField(SortType.SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(isReverse => !isReverse)}
        >
          Reverse
        </button>
        {isActive && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetButtonClick}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => {
          return (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
