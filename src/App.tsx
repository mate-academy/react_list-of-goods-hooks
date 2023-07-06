import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

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

enum Sort {
  DEFAULT_SORT = '',
  SORT_GOODS_ALPH = 'alphabetically',
  SORT_GOODS_LENGTH = 'length',
}

interface FilteredParams {
  sortFilter: Sort;
  reversedGoods: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortFilter, reversedGoods }: FilteredParams,
) {
  const preperedGoods = [...goods];

  if (sortFilter) {
    preperedGoods.sort((good1, good2) => {
      if (sortFilter === Sort.SORT_GOODS_ALPH) {
        return good1.localeCompare(good2);
      }

      if (sortFilter === Sort.SORT_GOODS_LENGTH) {
        return good1.length - good2.length;
      }

      return 0;
    });
  }

  if (reversedGoods) {
    preperedGoods.reverse();
  }

  return preperedGoods;
}

export const App: React.FC = () => {
  const [sortFilter, setSortFilter] = useState(Sort.DEFAULT_SORT);
  const [reversedGoods, setReversedGoods] = useState<boolean>(false);

  const vissibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortFilter, reversedGoods },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortFilter !== Sort.SORT_GOODS_ALPH },
          )}
          onClick={() => setSortFilter(Sort.SORT_GOODS_ALPH)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortFilter !== Sort.SORT_GOODS_LENGTH },
          )}
          onClick={() => setSortFilter(Sort.SORT_GOODS_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !reversedGoods },
          )}
          onClick={() => setReversedGoods(!reversedGoods)}
        >
          Reverse
        </button>

        { (sortFilter !== Sort.DEFAULT_SORT || reversedGoods) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortFilter(Sort.DEFAULT_SORT);
              setReversedGoods(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {vissibleGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
