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

type Goods = string[];

type SortParametrs = {
  sortField: SortType;
  isReversed: boolean;
};

enum SortType {
  SORT_FIELD_ALPHABET = 'alphabet',
  SORT_FIELD_LENGTH = 'length',
  SORT_FIELD_EMPTY = '',
}

function getPreparedGoods(
  goods:Goods,
  { sortField, isReversed }:SortParametrs,
):Goods {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);
        case SortType.SORT_FIELD_LENGTH:
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
  const [sortField, setSortField] = useState(SortType.SORT_FIELD_EMPTY);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortField, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            ' is-light': sortField !== SortType.SORT_FIELD_ALPHABET,
          })}
          onClick={() => setSortField(SortType.SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            ' is-light': sortField !== SortType.SORT_FIELD_LENGTH,
          })}
          onClick={() => setSortField(SortType.SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            ' is-light': !isReversed,
          })}
          onClick={() => setIsReversed(revers => !revers)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReversed(false);
              setSortField(SortType.SORT_FIELD_EMPTY);
            }}
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
