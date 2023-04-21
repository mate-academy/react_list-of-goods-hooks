import React, { useState } from 'react';
import classNames from 'classnames';
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

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

const getReorderedGoods = (
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) => {
  const visibleGoods = [...goods];

  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort((firstGood, secondGood) => (
      firstGood.localeCompare(secondGood)));
  }

  if (sortType === SortType.LENGTH) {
    visibleGoods.sort((firstGood, secondGood) => (
      firstGood.length - secondGood.length));
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
};

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const isAlphabetSort = sortType === SortType.ALPHABET;
  const isLengthSort = sortType === SortType.LENGTH;
  const isResetButtonActive = sortType !== SortType.NONE || isReversed;

  const products = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );

  const handleSortByAlphabet = () => {
    setSortType(SortType.ALPHABET);
  };

  const handleSortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const handleListReverse = () => {
    setIsReversed(current => !current);
  };

  const handleListReset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': !isAlphabetSort,
          })}
          onClick={handleSortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': !isLengthSort,
          })}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleListReverse}
        >
          Reverse
        </button>

        {isResetButtonActive && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleListReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {products.map(product => (
            <li data-cy="Good" key={product}>
              {product}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
