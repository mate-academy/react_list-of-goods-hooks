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
  NoSort = '',
  ByLength = 'byLength',
  Alphabetically = 'alphabetically',
}

const sortGoods = (
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) => {
  const sortingGoods = [...goods];

  switch (sortType) {
    case SortType.NoSort:
      break;
    case SortType.ByLength:
      sortingGoods.sort((a: string, b: string) => a.length - b.length);
      break;
    case SortType.Alphabetically:
      sortingGoods.sort((a: string, b: string) => a.localeCompare(b));
      break;
    default:
      throw Error('Unexpected SortType value');
  }

  if (isReversed) {
    sortingGoods.reverse();
  }

  return sortingGoods;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NoSort);
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = sortGoods(goodsFromServer, sortType, isReversed);

  const isResetButtonAvailable = sortType || isReversed;

  const handleButtonReset = () => {
    setSortType(SortType.NoSort);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.Alphabetically },
          )}
          onClick={() => setSortType(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortType !== SortType.ByLength },
          )}
          onClick={() => setSortType(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setIsReversed(wasReversed => !wasReversed)}
        >
          Reverse
        </button>

        {isResetButtonAvailable && (
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
        <ul>
          {sortedGoods.map((good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          )))}
        </ul>
      </ul>
    </div>
  );
};
