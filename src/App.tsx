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
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

// Use this function in the render method to prepare goods
export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SortType.LENGTH:
      visibleGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const goods = getReorderedGoods(goodsFromServer, { sortType, isReversed });

  const handleAlphabeticalSort = () => {
    setSortType(SortType.ALPHABET);
  };

  const handleLengthSort = () => {
    setSortType(SortType.LENGTH);
  };

  const handleReverse = () => {
    setIsReversed((prevState) => (!prevState));
  };

  const handleReset = () => {
    setSortType(SortType.NONE);
    setIsReversed((prevState) => (!prevState));
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            {
              'is-light': sortType !== SortType.ALPHABET,
            },
          )}
          onClick={() => handleAlphabeticalSort()}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
          onClick={() => handleLengthSort()}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            {
              'is-light': !isReversed,
            },
          )}
          onClick={() => handleReverse()}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => handleReset()}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        <ul>
          {goods.map((good) => {
            return <li key={good} data-cy="Good">{good}</li>;
          })}
        </ul>
      </ul>
    </div>
  );
};
