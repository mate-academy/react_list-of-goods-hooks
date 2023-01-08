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

export const App: React.FC = () => {
  const [sortType, setType] = useState(SortType.NONE);
  const [isReversed, switchOrder] = useState(false);

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

    // eslint-disable-next-line no-console
    console.log(sortType, isReversed);

    return visibleGoods;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setType(SortType.ALPHABET)}
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
          onClick={() => setType(SortType.LENGTH)}
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
          onClick={() => switchOrder(currentOrder => !currentOrder)}
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

        {(isReversed === true || sortType !== SortType.NONE) && (
          <button
            onClick={() => {
              switchOrder(false);
              setType(SortType.NONE);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {getReorderedGoods(goodsFromServer, sortType, isReversed)
          .map(good => <li data-cy="Good" key={good}>{good}</li>)}
      </ul>
    </div>
  );
};
