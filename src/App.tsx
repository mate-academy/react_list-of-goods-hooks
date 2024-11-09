import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';
import { Keys } from './types/Keys';
import { SortOption } from './types/SortOption';
import { SortType } from './types/SortType';

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

function keyGeneration({ good, index }: Keys): string {
  return `${good}_${index}`;
}

function getPreparedGoods(
  goods: string[],
  { sortField, isReversed }: SortOption,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case SortType.SORT_ALPH: {
          return a.localeCompare(b);
        }

        case SortType.SORT_LENGTH: {
          return a.length - b.length;
        }

        default:
          return 0;
      }
    });
  }

  return isReversed ? preparedGoods.reverse() : preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.SORT_DEFAULT);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const reset = () => {
    setSortField(SortType.SORT_DEFAULT);
    setIsReversed(false);
  };

  const showResetButton = sortField !== SortType.SORT_DEFAULT || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.SORT_ALPH,
          })}
          onClick={() => setSortField(SortType.SORT_ALPH)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.SORT_LENGTH,
          })}
          onClick={() => setSortField(SortType.SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': isReversed !== true,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            type="button"
            className={cn({
              'button is-danger': sortField !== null || isReversed === false,
            })}
            onClick={() => reset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map((good, index) => (
            <li data-cy="Good" key={keyGeneration({ good, index })}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
