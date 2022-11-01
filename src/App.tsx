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
  ALPABET,
  LENGTH,
}

export function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.LENGTH:
      visibleGoods.sort((goodA, goodB) => goodA.length - goodB.length);
      break;
    case SortType.ALPABET:
      visibleGoods.sort((goodA, goodB) => goodA.localeCompare(goodB));
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
  const [isReversed, setIsReverse] = useState<boolean>(false);
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);

  const sortedGoods = getReorderedGoods(goodsFromServer, sortType, isReversed);

  const resetState = () => {
    setSortType(SortType.NONE);
    setIsReverse(false);
  };

  const sortByName = () => {
    setSortType(SortType.ALPABET);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== SortType.ALPABET,
          })}
          onClick={sortByName}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success',
            { 'is-light': sortType !== SortType.LENGTH })}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning',
            { 'is-light': !isReversed })}
          onClick={() => setIsReverse(!isReversed)}
        >
          Reverse
        </button>
        {(sortType !== SortType.NONE || isReversed)
          ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={resetState}
            >
              Reset
            </button>
          )
          : null}
      </div>

      <ul>
        {sortedGoods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
