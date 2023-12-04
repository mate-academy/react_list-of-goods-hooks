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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

enum SortBy {
  Alphabet = SORT_BY_ALPHABET,
  Length = SORT_BY_LENGTH,
  Default = '',
}

interface Goods {
  sortBy: SortBy | null;
  isReversed: boolean;
}

function getPreparedGoods(goods: string[], { sortBy, isReversed }: Goods) {
  const preparedGoods = [...goods];

  if (sortBy) {
    preparedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SortBy.Alphabet:
          return good1.localeCompare(good2);

        case SortBy.Length:
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
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.Default);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortBy, isReversed },
  );

  const changeIsReversed = () => (
    setIsReversed(currentReversed => !currentReversed)
  );

  const resetSorting = () => {
    setSortBy(SortBy.Default);
    setIsReversed(false);
  };

  const isSortedAndReversed = sortBy || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SortBy.Alphabet,
          })}
          onClick={() => setSortBy(SortBy.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== SortBy.Length,
          })}
          onClick={() => setSortBy(SortBy.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={changeIsReversed}
        >
          Reverse
        </button>

        {(isSortedAndReversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={resetSorting}
            >
              Reset
            </button>
          )}

      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li
              data-cy="Good"
              key={good}
            >
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
