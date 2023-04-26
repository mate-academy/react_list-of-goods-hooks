import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
  NONE,
  ALPHABET,
  LENGTH,
}

function sortGoods(goods: string[], sortType: SortType) {
  goods.sort((goodA, goodB) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return goodA.localeCompare(goodB);

      case SortType.LENGTH:
        return goodA.length - goodB.length;

      default:
        return 0;
    }
  });
}

export const App: React.FC = () => {
  const [isReverse, setReverse] = useState(false);
  const [sortType, setSort] = useState(SortType.NONE);

  const handleReverse = () => setReverse(!isReverse);
  const handleReset = () => {
    setReverse(false);
    setSort(SortType.NONE);
  };

  const handleSortAlph = () => setSort(SortType.ALPHABET);
  const handleSortLength = () => setSort(SortType.LENGTH);
  const isReversedOrSorted = isReverse || sortType !== SortType.NONE;

  const goods = [...goodsFromServer];

  sortGoods(goods, sortType);

  if (isReverse) {
    goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={handleSortAlph}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success',
            {
              'is-light': sortType !== SortType.LENGTH,
            })}
          onClick={handleSortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverse}
          className={classNames('button', 'is-warning',
            {
              'is-light': !isReverse,
            })}
        >
          Reverse
        </button>
        {isReversedOrSorted && (
          <button
            type="button"
            onClick={handleReset}
            className={classNames('button', 'is-danger',
              {
                'is-light': !isReverse && sortType === SortType.NONE,
              })}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        <ul>
          {goods.map(good => (
            <li key={good} data-cy="Good">{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
