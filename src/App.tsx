import React, { useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

const goodsFromServer: string[] = [
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
  Alphabet = 'alphabet',
  Length = 'length',
  Default = '',
}

const getNewSort = (
  goods: string[],
  sortType: SortType,
  reversed: boolean,
): string[] => {
  const newGoods = [...goods];

  if (!sortType && reversed) {
    return newGoods.reverse();
  }

  if (sortType) {
    newGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.Length:
          if (good1.length !== good2.length) {
            return reversed
              ? good2.length - good1.length
              : good1.length - good2.length;
          }

          return reversed
            ? good2.localeCompare(good1)
            : good1.localeCompare(good2);

        case SortType.Alphabet:
          return reversed
            ? good2.localeCompare(good1)
            : good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  return newGoods;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [sortReverse, setSortReverse] = useState(false);
  const updateGoods = getNewSort(goodsFromServer, sortType, sortReverse);

  const newSortType = (type: SortType) => {
    setSortType(type);
  };

  const newSortReverse = () => {
    setSortReverse(!sortReverse);
  };

  const buttonClasses = classNames('button', 'is-info', {
    'is-light': sortType !== SortType.Alphabet,
  });

  const sortByLength = classNames('button', 'is-info', 'is-success', {
    'is-light': sortType !== SortType.Length,
  });

  const reverseClasses = classNames('button', 'is-info', 'is-warning', {
    'is-light': !sortReverse,
  });

  const resetClasses = classNames('button', 'is-danger', 'is-light', {
    hidden: sortType === SortType.Default && !sortReverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={buttonClasses}
          onClick={() => newSortType(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={sortByLength}
          onClick={() => newSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={reverseClasses}
          onClick={newSortReverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.Default || sortReverse) && (
          <button
            type="button"
            className={resetClasses}
            onClick={() => {
              setSortType(SortType.Default);
              setSortReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {updateGoods.map((good) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
