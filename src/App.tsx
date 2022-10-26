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

interface Good {
  name: string,
  id: number,
}

const goodsWithID = goodsFromServer.map((good, i) => ({
  name: good,
  id: i,
}));

enum SortType {
  NONE,
  ALPABET,
  LENGTH,
}

export function getReorderedGoods(
  goods: Good[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((goodA, goodB) => {
    switch (sortType) {
      case SortType.ALPABET:
        return goodA.name.localeCompare(goodB.name);

      case SortType.LENGTH:
        return goodA.name.length - goodB.name.length;

      case SortType.NONE:
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
  const visibleGoods = getReorderedGoods(
    goodsWithID,
    sortType,
    isReversed,
  );
  const isButtonResetVisible = sortType !== SortType.NONE || isReversed;
  const setDefaultValues = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info',
            { 'is-light': sortType !== SortType.ALPABET })}
          onClick={() => setSortType(SortType.ALPABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success',
            { 'is-light': sortType !== SortType.LENGTH })}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning',
            { 'is-light': !isReversed })}
          onClick={() => setIsReversed(current => !current)}
        >
          Reverse
        </button>

        {isButtonResetVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={setDefaultValues}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(({ name, id }) => (
            <li data-cy="Good" key={id}>
              {name}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
