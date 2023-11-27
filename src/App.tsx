import cn from 'classnames';

import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
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

enum Sort {
  SORT_ABC = 'Sort ABC',
  SORT_LENGTH = 'Sort by length',
}

export const App: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  let sortedGoods = [...goodsFromServer];

  if (selectedSort) {
    switch (selectedSort) {
      case Sort.SORT_ABC:
        sortedGoods = sortedGoods.sort((good1, good2) => (
          good1.localeCompare(good2)
        ));
        break;

      case Sort.SORT_LENGTH:
        sortedGoods = sortedGoods.sort((good1, good2) => (
          good1.length - good2.length
        ));
        break;

      default:
        break;
    }

    if (isReverse) {
      sortedGoods.reverse();
    }
  }

  if (!selectedSort && isReverse) {
    sortedGoods.reverse();
  }

  const reset = () => {
    setSelectedSort('');
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn('button', 'is-info',
              { 'is-light': selectedSort !== Sort.SORT_ABC })
          }
          onClick={() => setSelectedSort(Sort.SORT_ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn('button', 'is-success',
              { 'is-light': selectedSort !== Sort.SORT_LENGTH })
          }
          onClick={() => setSelectedSort(Sort.SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn('button', 'is-warning',
              { 'is-light': !isReverse })
          }
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {(selectedSort || isReverse)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={reset}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        <ul>
          {sortedGoods.map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
