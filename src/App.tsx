import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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
  LENGTH,
  ALPHABETICALLY,
  NONE,
}

type OrderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

function getOrderedGoods(goods: string[],
  { sortType, isReversed }: OrderOptions) {
  const visibleGoods = [...goods];

  visibleGoods.sort((goodA: string, goodB: string) => {
    switch (sortType) {
      case SortType.ALPHABETICALLY:
        return goodA.localeCompare(goodB);
      case SortType.LENGTH:
        return goodA.length - goodB.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getOrderedGoods(goodsFromServer,
    { sortType, isReversed });

  const setSortByAlphabet = () => {
    setSortType(SortType.ALPHABETICALLY);
  };

  const serSortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const toggleReverse = () => {
    setIsReversed(current => !current);
  };

  const handleSortReset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SortType.ALPHABETICALLY,
          })}
          onClick={setSortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={serSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleSortReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
