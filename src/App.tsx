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

  // Sort and reverse goods if needed
  visibleGoods.sort((el1, el2) => {
    switch (sortType) {
      case SortType.NONE:
        return 0;

      case SortType.ALPHABET:
        return el1.localeCompare(el2);

      case SortType.LENGTH:
        return el1.length - el2.length;

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
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const reversed = () => {
    setIsReversed(prevState => !prevState);
  };

  const reset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const sortAlphabetically = () => {
    setSortType(SortType.ALPHABET);
  };

  const showResetBtn = sortType === SortType.NONE && !isReversed;
  const goods = getReorderedGoods(goodsFromServer, { sortType, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info',
            { 'is-light': sortType !== SortType.ALPHABET })}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success',
            { 'is-light': sortType !== SortType.LENGTH })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning',
            { 'is-light': !isReversed })}
          onClick={reversed}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={reset}
          style={showResetBtn ? { display: 'none' } : {}}
        >
          Reset
        </button>
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
