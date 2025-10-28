import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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
  default,
  length,
  name,
}

type Goods = string[];

interface SortBy {
  sortField: SortType;
  isReversed: boolean;
}

function getPreparedGoods(
  goods: Goods,
  { sortField, isReversed }: SortBy,
): Goods {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    if (sortField === SortType.length) {
      return good1.length - good2.length;
    }

    if (sortField === SortType.name) {
      return good1.localeCompare(good2);
    }

    return 0;
  });

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const initialGoods: Goods = [...goodsFromServer];
  const [sortField, setSortField] = useState<SortType>(SortType.default);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });
  const showReset = !visibleGoods.every(
    (good, index) => good === initialGoods[index],
  );

  function handleReverse() {
    setIsReversed(prev => !prev);
  }

  function reset() {
    setSortField(SortType.default);
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.name)}
          className={`button is-info ${sortField === SortType.name ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortType.length)}
          className={`button is-info ${sortField === SortType.length ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverse}
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>
        {showReset && (
          <button
            type="button"
            onClick={reset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
