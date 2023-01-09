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

enum SortType {
  NONE = 'none',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

const getReorderedGoods = (
  goods: string[],
  sortState: SortType,
  reversedState: boolean,
) => {
  const visibleGoods = [...goods];

  visibleGoods.sort((g1, g2) => {
    switch (sortState) {
      case SortType.LENGTH:
        return g1[sortState] - g2[sortState];

      case SortType.ALPHABET:
        return g1.localeCompare(g2);

      default: return 0;
    }
  });

  if (reversedState) {
    visibleGoods.reverse();
  }

  return visibleGoods;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setReverse] = useState(false);
  const resetConditions = isReversed === true || sortType !== SortType.NONE;
  const reorderedGoods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SortType.ALPHABET)}
          type="button"
          className={cn(
            'button',
            'is-info',
            {
              'is-light': sortType !== SortType.ALPHABET,
            },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SortType.LENGTH)}
          type="button"
          className={cn(
            'button',
            'is-success',
            {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(currentOrder => !currentOrder)}
          type="button"
          className={cn(
            'button',
            'is-warning',
            {
              'is-light': !isReversed,
            },
          )}
        >
          Reverse
        </button>

        {resetConditions && (
          <button
            onClick={() => {
              setReverse(false);
              setSortType(SortType.NONE);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {reorderedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
