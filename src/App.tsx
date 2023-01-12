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

function getReorderedGoods(
  sortType: SortType,
  isReversed: boolean,
  goods: string[],
) {
  const visibleGoods = [...goods];

  if (sortType) {
    visibleGoods.sort((a, b) => {
      switch (sortType) {
        case SortType.ALPHABET:
          return a.localeCompare(b);

        case SortType.LENGTH:
          return a.length - b.length;

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
  const goods = goodsFromServer;
  const [isVisible, setIsVisible] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getReorderedGoods(
    sortType,
    isReversed,
    goods,
  );

  const sortAlphabetically = () => {
    setSortType(SortType.ALPHABET);
    setIsVisible(true);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
    setIsVisible(true);
  };

  const reverseOrder = () => {
    setIsReversed(current => !current);
    setIsVisible(!isReversed || !!sortType);
  };

  const resetOrder = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
    setIsVisible(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={sortAlphabetically}
          className={cn('button is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortByLength}
          className={cn('button is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reverseOrder}
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>
        {isVisible && (
          <button
            type="button"
            onClick={resetOrder}
            className="button is-danger is-light"
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
