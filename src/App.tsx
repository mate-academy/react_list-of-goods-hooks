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
  NONE,
  ALPHABET,
  LENGTH,
}

export const App: React.FC = () => {
  const [isReversed, setReverse] = useState(false);
  const [sortOrder, setSortOrder] = useState(SortType.NONE);

  const reset = () => {
    setSortOrder(SortType.NONE);
    setReverse(false);
  };

  const getReorderedGoods = (
    goods: string[],
    sortType: SortType,
    reversed: boolean,
  ) => {
    const visibleGoods = [...goods];

    visibleGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.ALPHABET:
          return good1.localeCompare(good2);

        case SortType.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });

    if (reversed) {
      visibleGoods.reverse();
    }

    return visibleGoods;
  };

  const reorderedGoods = getReorderedGoods(
    goodsFromServer,
    sortOrder,
    isReversed,
  );

  const isDefaultOrder = sortOrder === SortType.NONE
  && !isReversed;

  return (

    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortOrder !== SortType.ALPHABET,
          })}
          onClick={() => setSortOrder(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortOrder !== SortType.LENGTH,
          })}
          onClick={() => setSortOrder(SortType.LENGTH)}
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

        {(!isDefaultOrder) && (
          <button
            type="button"
            className={cn('button is-danger is-light')}
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {reorderedGoods
            .map(good => (
              <li
                key={good}
                data-cy="Good"
              >
                {good}
              </li>
            ))}
        </ul>
      </ul>
    </div>
  );
};
