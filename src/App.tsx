import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

type Goods = string[];

enum SortType {
  BY_ALPHABET = 'alphabet',
  BY_LENGTH = 'length',
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
  sortType: SortType,
  isReversed: boolean,
) => {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.BY_ALPHABET:
          return good1.localeCompare(good2);

        case SortType.BY_LENGTH:
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
  const [sortType, setSortType] = useState(SortType.DEFAULT_FIELD);
  const [isReversed, setIsReversed] = useState(false);

  const isSorted = sortType || isReversed;

  const sortedGoods = getPreparedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  const handleReset = () => {
    setSortType(SortType.DEFAULT_FIELD);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SortType.BY_ALPHABET)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SortType.BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SortType.BY_LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SortType.BY_LENGTH,
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

        {isSorted
          && (
            <button
              onClick={() => handleReset()}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
