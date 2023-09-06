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

const getReorderedGoods = (
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) => {
  const visibleGoods = [...goods];

  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === SortType.LENGTH) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
};

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const handleReverse = () => {
    setIsReversed(prevState => !prevState);
  };

  const handleByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const handleAlphabetically = () => {
    setSortType(SortType.ALPHABET);
  };

  const handleReset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(['button', 'is-info'],
            { 'is-light': sortType !== SortType.ALPHABET })}
          onClick={handleAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(['button', 'is-success'],
            { 'is-light': sortType !== SortType.LENGTH })}
          onClick={handleByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(['button', 'is-warning'],
            { 'is-light': !isReversed })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(isReversed || sortType !== SortType.NONE)
          && (
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
        {getReorderedGoods(goodsFromServer, { sortType, isReversed })
          .map((good) => {
            return (
              <li data-cy="Good" key={good}>{good}</li>
            );
          })}
      </ul>
    </div>
  );
};
