import React, { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';

import './App.scss';

enum SortType {
  Alphabetical = 'alphabetical',
  Length = 'length',
  Default = '',
}

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

const getPreparedGoods = (
  goods: string[],
  sortType: SortType,
  reverse: boolean,
): string[] => {
  const preparedGoods = [...goods];

  switch (sortType) {
    case SortType.Alphabetical:
      preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SortType.Length:
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    default:
      break;
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.Default);
  const [reverse, setReverse] = useState<boolean>(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortType, reverse);

  const reverseSort = () => {
    setReverse(!reverse);
  };

  const resetSort = () => {
    setSortType(SortType.Default);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.Alphabetical,
          })}
          onClick={() => setSortType(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.Length,
          })}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={reverseSort}
        >
          Reverse
        </button>

        {(sortType !== '' || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSort}
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
