import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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
  Name = 'name',
  Length = 'length',
  None = 'none',
}

function getGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
): string[] {
  const goodsToReturn = [...goods];

  switch (sortType) {
    case SortType.Length:
      goodsToReturn.sort((a, b) => a.length - b.length);
      break;
    case SortType.Name:
      goodsToReturn.sort((a, b) => a.localeCompare(b));
      break;
    default:
  }

  if (isReversed) {
    goodsToReturn.reverse();
  }

  return goodsToReturn;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.None);
  const [isReversed, setIsReversed] = useState(false);
  const goodsList = getGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn('button',
              'is-info',
              { 'is-light': sortType !== SortType.Name })
          }
          onClick={() => setSortType(SortType.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn('button',
              'is-success',
              { 'is-light': sortType !== SortType.Length })
          }
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn('button',
              'is-warning',
              { 'is-light': !isReversed })
          }
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortType !== SortType.None || isReversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortType(SortType.None);
                setIsReversed(false);
              }}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {goodsList.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
