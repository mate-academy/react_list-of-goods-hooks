import React, { useState, useMemo } from 'react';

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

enum SortBy {
  ALPHABET = 'alphabet',
  LENGTH = 'length',
  DEFAULT = '',
}

type GoodsType = {
  sortGoods: SortBy;
  reverse: boolean;
};

const getPreparedGoods = (
  goods: string[],
  { sortGoods, reverse }: GoodsType,
) => {
  const preparedGoods: string[] = [...goods];

  if (sortGoods) {
    preparedGoods.sort((good1, good2) => {
      switch (sortGoods) {
        case SortBy.ALPHABET:
          return good1.localeCompare(good2);

        case SortBy.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortGoods, setSortGoods] = useState(SortBy.DEFAULT);
  const [reverse, setReverse] = useState(false);

  const visibleGoods = useMemo(() => getPreparedGoods(goodsFromServer, {
    sortGoods,
    reverse,
  }), [sortGoods, reverse]);

  const cancelReset = () => {
    setSortGoods(SortBy.DEFAULT);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortGoods !== SortBy.ALPHABET,
          })}
          onClick={() => setSortGoods(SortBy.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortGoods !== SortBy.LENGTH,
          })}
          onClick={() => setSortGoods(SortBy.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning ', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sortGoods || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={cancelReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
