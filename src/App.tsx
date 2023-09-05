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

export enum SortType {
  Default = '',
  Alphabeticaly = 'Sort alphabetically',
  By_Length = 'Sort by length',
  Reset = 'Reset',
  Reverse = 'Reverse',
}

function getPreparedGoods(
  goods: string[],
  sortKey: SortType,
  isReversed: boolean,
) {
  const tempGoods = [...goods];

  if (sortKey) {
    tempGoods.sort((goodA, goodB) => {
      switch (sortKey) {
        case SortType.Alphabeticaly:
          return goodA.localeCompare(goodB);

        case SortType.By_Length:
          return goodA.length - goodB.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    tempGoods.reverse();
  }

  return tempGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = getPreparedGoods(
    goodsFromServer, sortType, isReversed,
  );

  const handleClearButtonClick = () => {
    setSortType(SortType.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            {
              'is-light': sortType !== SortType.Alphabeticaly,
            },
          )}
          onClick={() => {
            setSortType(SortType.Alphabeticaly);
          }}
        >
          {SortType.Alphabeticaly}
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SortType.By_Length,
          })}
          onClick={() => {
            setSortType(SortType.By_Length);
          }}
        >
          {SortType.By_Length}
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          {SortType.Reverse}
        </button>

        {(sortType || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleClearButtonClick}
          >
            {SortType.Reset}
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
