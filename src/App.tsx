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
  SORT_ORIGINAL = 'original',
  SORT_ALPHABETICALLY = 'alphabetical',
  SORT_LENGTH = 'length',
}

export const App: React.FC = () => {
  const [visibleGoods, setVisibleGoods] = useState<string[]>(goodsFromServer);
  const [sortOrder, setSortOrder] = useState(SortType.SORT_ORIGINAL);
  const [isReversed, setIsReversed] = useState(false);

  const applySorting = (sortedGoods: string[], order: SortType) => {
    setVisibleGoods(isReversed ? [...sortedGoods].reverse() : sortedGoods);
    setSortOrder(order);
  };

  const sortGoodsAlphabetically = () => {
    applySorting(
      [...visibleGoods].sort((good1, good2) => good1.localeCompare(good2)),
      SortType.SORT_ALPHABETICALLY,
    );
  };

  const sortGoodsByLength = () => {
    const sortedGoods = [...goodsFromServer].sort(
      (good1, good2) => good1.length - good2.length,
    );

    applySorting(sortedGoods, SortType.SORT_LENGTH);
  };

  const reverseGoods = () => {
    setVisibleGoods([...visibleGoods].reverse());
    setIsReversed(!isReversed);
  };

  const resetGoods = () => {
    setVisibleGoods(goodsFromServer);
    setSortOrder(SortType.SORT_ORIGINAL);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortOrder === SortType.SORT_ALPHABETICALLY ? '' : 'is-light'}`}
          onClick={sortGoodsAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortOrder === SortType.SORT_LENGTH ? '' : 'is-light'}`}
          onClick={sortGoodsByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {sortOrder !== SortType.SORT_ORIGINAL || isReversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
