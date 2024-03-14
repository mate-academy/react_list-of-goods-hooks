import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { SortTypes } from './types/SortType';

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

const SORT_FIELD_LENGTH = SortTypes.length;
const SORT_FIELD_ALPH = SortTypes.alphabet;

type Goods = (
  goods: string[],
  sortField: SortTypes,
  isReversed: boolean,
) => string[];

const getPreparedGoods: Goods = function goodsPreparation(
  goods,
  sortField,
  isReversed,
): string[] {
  const preparedGoods = [...goods];

  preparedGoods.sort((good, anotherGood) => {
    switch (sortField) {
      case SORT_FIELD_LENGTH:
        return good.length - anotherGood.length;
      case SORT_FIELD_ALPH:
        return good.localeCompare(anotherGood);
      default:
        return 0;
    }
  });

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortTypes.default);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);
  const isChanged = () => {
    return sortField !== SortTypes.default || isReversed;
  };

  const reset = () => {
    setSortField(SortTypes.default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPH,
          })}
          onClick={() => setSortField(SORT_FIELD_ALPH)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {isChanged() && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              reset();
            }}
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
