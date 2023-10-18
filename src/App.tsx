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

enum SortType {
  all = '',
  name = 'name',
  length = 'length',
}

const handleSort = (
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
) => {
  const sortedGoods = [...goods];

  switch (sortField) {
    case SortType.name:
      sortedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SortType.length:
      sortedGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.all);
  const [isReversed, setReverse] = useState(false);

  const visibleGoods = handleSort(goodsFromServer, sortField, isReversed);

  const handleReset = () => {
    setSortField(SortType.all);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.name,

          })}
          onClick={() => setSortField(SortType.name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.length,
          })}
          onClick={() => setSortField(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setReverse(!isReversed)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleReset()}
          >
            Reset
          </button>
        )}

      </div>

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
    </div>
  );
};
