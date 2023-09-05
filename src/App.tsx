import { useState } from 'react';
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
  noSort = '',
  sortByLength = 'leng',
  sortByName = 'name',
}

interface StateInterface {
  sortType: SortType;
  isReversed: boolean;
}

const sortGoods = (
  goods: string[], { sortType, isReversed }: StateInterface,
) => {
  if (sortType === SortType.noSort && !isReversed) {
    return goods;
  }

  const sortedGoods = [...goods];

  if (sortType === SortType.sortByLength || sortType === SortType.sortByName) {
    sortedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.sortByLength:
          return good1.length - good2.length;
        case SortType.sortByName:
          return good1.localeCompare(good2);
        default:
          throw new Error('The parameter of sort does not exist');
      }
    });
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [sortType, setSortType] = useState(SortType.noSort);
  const [isReversed, setIsReversed] = useState(false);

  const goods = sortGoods(goodsFromServer, { sortType, isReversed });

  const isResetButton = sortType || isReversed;

  const handleResetClick = () => {
    setSortType(SortType.noSort);
    setIsReversed(false);
  };

  const handleSortClick = (sortTypeValue: SortType) => {
    setSortType(sortTypeValue);
  };

  const handleReverseClick = () => {
    setIsReversed(!isReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': SortType.sortByName !== sortType,
          })}
          onClick={() => handleSortClick(SortType.sortByName)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': SortType.sortByLength !== sortType,
          })}
          onClick={() => handleSortClick(SortType.sortByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverseClick}
        >
          Reverse
        </button>

        {isResetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetClick}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
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
