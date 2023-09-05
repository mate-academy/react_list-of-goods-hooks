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
  noSort = '',
  byLength = 'byLength',
  alphabetically = 'alphabetically',
}

const sortGoods = (
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) => {
  const sortingGoods = [...goods];

  switch (sortType) {
    case SortType.noSort:
      break;
    case SortType.byLength:
      sortingGoods.sort((firstGood: string, secondGood: string) => {
        return firstGood.length - secondGood.length;
      });
      break;
    case SortType.alphabetically:
      sortingGoods.sort((firstGood: string, secondGood: string) => {
        return firstGood.localeCompare(secondGood);
      });
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
  const [sortType, setSortType] = useState(SortType.noSort);
  const [isReversed, setIsReversed] = useState(false);

  const renderedGoods = sortGoods(goodsFromServer, sortType, isReversed);

  const isResetButtonAvailable = sortType || isReversed;

  const handleButtonReset = () => {
    setSortType(SortType.noSort);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.alphabetically,
          })}
          onClick={() => setSortType(SortType.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.byLength,
          })}
          onClick={() => setSortType(SortType.byLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isResetButtonAvailable && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleButtonReset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {renderedGoods.map((good => (
            <li
              data-cy="Good"
              key={good}
            >
              {good}
            </li>
          )))}
        </ul>
      </ul>
    </div>
  );
};
