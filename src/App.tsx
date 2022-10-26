import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  { name: 'Dumplings', id: uuid() },
  { name: 'Carrot', id: uuid() },
  { name: 'Eggs', id: uuid() },
  { name: 'Ice cream', id: uuid() },
  { name: 'Apple', id: uuid() },
  { name: 'Bread', id: uuid() },
  { name: 'Fish', id: uuid() },
  { name: 'Honey', id: uuid() },
  { name: 'Jam', id: uuid() },
  { name: 'Garlic', id: uuid() },
];

enum SortType {
  NONE,
  ALPABET,
  LENGTH,
}

type Good = {
  id: string;
  name: string;
};

export function getVisibleGoods(
  goods: Good[],
  sortType: SortType,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort(({ name: nameA }, { name: nameB }) => {
    switch (sortType) {
      case SortType.ALPABET:
        return nameA.localeCompare(nameB);

      case SortType.LENGTH:
        return nameA.length - nameB.length;

      default:
        return 0;
    }
  });

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const sortAlphabetically = () => {
    setSortType(SortType.ALPABET);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const toggleReverse = () => {
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const visibleGoods = getVisibleGoods(
    goodsFromServer,
    sortType,
  );

  if (isReversed) {
    visibleGoods.reverse();
  }

  const shouldReset = sortType !== SortType.NONE || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.ALPABET },
          )}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {shouldReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li key={good.id} data-cy="Good">{good.name}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
