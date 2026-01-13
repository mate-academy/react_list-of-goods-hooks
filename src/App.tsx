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
  None,
  Alphabetically,
  ByLength,
}

interface FilterParams {
  sortType: SortType;
  isReversed: boolean;
}

function getPreparedGoods(
  listFromServer: string[],
  { sortType, isReversed }: FilterParams,
): string[] {
  const preparedGoods = [...listFromServer];

  if (sortType !== SortType.None) {
    preparedGoods.sort((a, b) => {
      switch (sortType) {
        case SortType.Alphabetically:
          return a.localeCompare(b);
        case SortType.ByLength:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return [...preparedGoods].reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortType,
    isReversed,
  });

  function handleReset() {
    setSortType(SortType.None);
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== SortType.Alphabetically ? 'is-light' : ''}`}
          onClick={() => setSortType(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortType !== SortType.ByLength ? 'is-light' : ''}`}
          onClick={() => setSortType(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(product => (
          <li key={product} data-cy="Good">
            {product}
          </li>
        ))}
      </ul>
    </div>
  );
};
