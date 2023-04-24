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
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType;
  isReversed: boolean;
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const displayGoods = [...goods];

  if (sortType === SortType.ALPHABET) {
    displayGoods.sort((firstGood, secondGood) => (
      firstGood.localeCompare(secondGood)
    ));
  }

  if (sortType === SortType.LENGTH) {
    displayGoods.sort(
      (firstGood, secondGood) => firstGood.length - secondGood.length,
    );
  }

  if (isReversed) {
    displayGoods.reverse();
  }

  return displayGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const handleAlphabetSort = () => setSortType(SortType.ALPHABET);

  const handleLengthSort = () => setSortType(SortType.LENGTH);

  const handleReverse = () => setReversed(!isReversed);

  const handleReset = () => {
    setReversed(false);
    setSortType(SortType.NONE);
  };

  const displayGoods = getReorderedGoods(goodsFromServer, {
    sortType,
    isReversed,
  });

  const activeReset = isReversed || sortType !== SortType.NONE;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={handleAlphabetSort}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={handleLengthSort}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {activeReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {displayGoods.map((good) => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
