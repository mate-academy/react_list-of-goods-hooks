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
  DEFAULT = '',
  SORT_BY_ALPHABET = 'alphabet',
  SORT_BY_LENGTH = 'length',
}

function sortedGoods(
  goods: string[],
  selectedOrder: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  if (selectedOrder) {
    visibleGoods.sort((first: string, second: string) => {
      switch (selectedOrder) {
        case SortType.SORT_BY_ALPHABET:
          return first.localeCompare(second);

        case SortType.SORT_BY_LENGTH:
          return first.length - second.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = sortedGoods(goodsFromServer, selectedOrder, isReversed);

  const resetButton = () => {
    setSelectedOrder(SortType.DEFAULT);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': selectedOrder !== SortType.SORT_BY_ALPHABET,
          })}
          onClick={() => setSelectedOrder(SortType.SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': selectedOrder !== SortType.SORT_BY_LENGTH,
          })}
          onClick={() => setSelectedOrder(SortType.SORT_BY_LENGTH)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>
        {
          (isReversed || selectedOrder) && (

            <button
              type="button"
              className="button is-danger is-light"
              onClick={resetButton}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {
          visibleGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))
        }
      </ul>

    </div>
  );
};
