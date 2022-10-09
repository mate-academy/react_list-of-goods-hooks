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

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort();
      break;
    case SortType.LENGTH:
      visibleGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    default:
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const sortByAlphabetHandler = () => {
    setSortType(SortType.ALPHABET);
  };

  const sortByLengthHandler = () => {
    setSortType(SortType.LENGTH);
  };

  const reverseHandler = () => {
    setIsReversed(prevState => !prevState);
  };

  const resetHandler = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const visibleGoods = getReorderedGoods(
    goodsFromServer,
    {
      sortType,
      isReversed,
    },
  );

  const isDefaultOrder = !isReversed && sortType === SortType.NONE;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            {
              'is-light': sortType !== SortType.ALPHABET,
            },
          )}
          onClick={sortByAlphabetHandler}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
          onClick={sortByLengthHandler}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-warning',
            {
              'is-light': !isReversed,
            },
          )}
          onClick={reverseHandler}
        >
          Reverse
        </button>

        {!isDefaultOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetHandler}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
