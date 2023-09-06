import React, { useState } from 'react';
import classnames from 'classnames';
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

const RESET_VALUE = 'Reset';
const REVERSE_VALUE = 'Reverse';

export enum SortType {
  Default = '',
  Alphabeticaly = 'Sort alphabetically',
  By_Length = 'Sort by length',
}

function getPreparedGoods(
  goods: string[],
  sortKey: SortType,
  isReversed: boolean,
) {
  const goodsCopy = [...goods];

  if (sortKey) {
    goodsCopy.sort((goodA, goodB) => {
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
    goodsCopy.reverse();
  }

  return goodsCopy;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const handleResetButton = sortType || isReversed;

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
          className={classnames(
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
          className={classnames('button', 'is-success', {
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
          className={classnames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prevIsReversed => !prevIsReversed)}
        >
          {REVERSE_VALUE}
        </button>

        {handleResetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleClearButtonClick}
          >
            {RESET_VALUE}
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
