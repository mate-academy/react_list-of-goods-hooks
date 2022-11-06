import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
  none,
  alphabetic,
  length,
}

function getReorderedGoods(goodsList: string[],
  sortOrder: SortType,
  isReversed: boolean) {
  const result = [...goodsList];

  result.sort((g1, g2) => {
    switch (sortOrder) {
      case SortType.alphabetic:
        return g1.localeCompare(g2);
      case SortType.length:
        return g1.length - g2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    result.reverse();
  }

  return result;
}

export const App: React.FC = () => {
  const [sortOrder, setOrder] = useState(SortType.none);
  const [isReversed, setReversed] = useState(false);

  const visibleGoods = getReorderedGoods(goodsFromServer,
    sortOrder,
    isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortOrder !== SortType.alphabetic,
          })}
          onClick={() => {
            setOrder(SortType.alphabetic);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortOrder !== SortType.length,
          })}
          onClick={() => {
            setOrder(SortType.length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => {
            setReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {(sortOrder !== SortType.none || isReversed !== false) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setOrder(SortType.none);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
