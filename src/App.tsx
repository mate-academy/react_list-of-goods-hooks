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
  ByLength = 'length',
  Alphabetically = 'alphabetically',
}

const sortGoods = (
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) => {
  if (sortType === SortType.noSort && !isReversed) {
    return goods;
  }

  const sortedGoods = [...goods];

  if (sortType === SortType.ByLength || sortType === SortType.Alphabetically) {
    sortedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.ByLength:
          return good1.length - good2.length;
        case SortType.Alphabetically:
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

  const goods = sortGoods(goodsFromServer, sortType, isReversed);

  const isResetButtonActive = sortType || isReversed;

  const handleButtonReset = () => {
    setSortType(SortType.noSort);
    setIsReversed(false);
  };

  const handleSortTypeChange = (sortTypeValue: SortType) => {
    setSortType(sortTypeValue);
  };

  const handleButtonReverse = () => {
    setIsReversed(!isReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': SortType.Alphabetically !== sortType,
          })}
          onClick={() => handleSortTypeChange(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': SortType.ByLength !== sortType,
          })}
          onClick={() => handleSortTypeChange(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleButtonReverse}
        >
          Reverse
        </button>

        {isResetButtonActive && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleButtonReset}
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
