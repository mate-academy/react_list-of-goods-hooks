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

// const SortType.sortABC = 'sortABC';
// const SortType.sortByLength = 'sortByLength';

enum SortType {
  sortABC = 'sortABC',
  sortByLength = 'sortByLength',
}

type Props = {
  sortBy: SortType | '';
  isReversed: boolean;
};

function getPreparedGoods(goods: string[], { sortBy, isReversed }: Props) {
  const preparedGoods = [...goods];

  if (sortBy) {
    preparedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SortType.sortABC:
          return good1.localeCompare(good2);

        case SortType.sortByLength:
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
  const [sortBy, setsortBy] = useState<SortType | ''>('');
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortBy,
    isReversed,
  });

  const changeOrder = () => {
    if (isReversed) {
      setIsReversed(false);
    } else {
      setIsReversed(true);
    }
  };

  const resetSort = () => {
    setsortBy('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setsortBy(SortType.sortABC)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SortType.sortABC,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setsortBy(SortType.sortByLength)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SortType.sortByLength,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={changeOrder}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
          <button
            onClick={resetSort}
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
