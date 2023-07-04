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
  LENGHT,
  ALPABETICALLY,
  NONE,
}

type OrderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

function orderGoods(goods: string[],
  { sortType, isReversed }: OrderOptions) {
  const visibleGoods = [...goods];

  visibleGoods.sort((good1: string, good2: string) => {
    switch (sortType) {
      case SortType.ALPABETICALLY:
        return good1.localeCompare(good2);
      case SortType.LENGHT:
        return good1.length - good2.length;
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
  const visibleGoods = orderGoods(goodsFromServer, { sortType, isReversed });

  const sortAlphabetically = () => {
    setSortType(SortType.ALPABETICALLY);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGHT);
  };

  const sortReverse = () => {
    setIsReversed(current => !current);
  };

  const sortReset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SortType.ALPABETICALLY,
          })}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SortType.LENGHT,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={sortReverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={sortReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good">{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
