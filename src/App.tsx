import React, { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  NONE = '',
  ALPHABETIC = 'alphabetic',
  LENGTH = 'length',
}

const initialGoods = [
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

function sortGoods(goodsList: string[], sortType: SortType) {
  const newGoods = [...goodsList];

  switch (sortType) {
    case SortType.ALPHABETIC:
      return newGoods.sort((a, b) => a.localeCompare(b));

    case SortType.LENGTH:
      return newGoods.sort((a, b) => a.length - b.length);

    default:
      return newGoods;
  }
}

export const App = () => {
  const [goods, setGoods] = useState(initialGoods);
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  let visibleGoods = sortGoods(goods, sortType);

  if (isReversed) {
    visibleGoods = [...visibleGoods].reverse();
  }

  function SortGoods(type: SortType) {
    setSortType(type);
    setGoods(sortGoods(initialGoods, type));
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.ALPHABETIC,
          })}
          onClick={() => SortGoods(SortType.ALPHABETIC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={() => SortGoods(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setGoods(initialGoods);
              setSortType(SortType.NONE);
              setIsReversed(false);
            }}
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
