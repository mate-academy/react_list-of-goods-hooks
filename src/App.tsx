import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

type Goods = string [];

enum SortType {
  SORTED_BY_ALPHABET = 'alphabet',
  SORTED_BY_LENGTH = 'length',
  DEFAULT_FIELD = '',
}

export const goodsFromServer: Goods = [
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

const getPreparedGoods = (
  goods: Goods,
  sortField: string,
  isReversed: boolean,
) => {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SORTED_BY_ALPHABET:
          return good1.localeCompare(good2);

        case SortType.SORTED_BY_LENGTH:
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
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.DEFAULT_FIELD);
  const [isReversed, setIsReversed] = useState(false);

  const changedGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    isReversed,
  );

  const clearSort = () => {
    setSortField(SortType.DEFAULT_FIELD);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.SORTED_BY_ALPHABET)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.SORTED_BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.SORTED_BY_LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.SORTED_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(reversed => !reversed)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {sortField || isReversed
          ? (
            <button
              onClick={() => clearSort()}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          ) : (
            ''
          )}
      </div>

      <ul>
        {changedGoods.map(good => (
          <li
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
