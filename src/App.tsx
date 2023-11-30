import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';

import './App.scss';
import { SortType } from './types/SortParams';

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

type GoodsList = string[];

function getSortedList(
  goods: GoodsList,
  sortOrder: SortType,
  isReversed: boolean,
) {
  const preparedGoods = [...goods];

  switch (sortOrder) {
    case SortType.Length:
      preparedGoods.sort((a, b) => a.length - b.length);
      break;

    case SortType.Alphabet:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;

    default:
      break;
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortOrder, setSortOrder] = useState(SortType.DefaultSort);
  const [isReversed, setIsReversed] = useState(false);
  const sortGoodsList = getSortedList(
    goodsFromServer,
    sortOrder,
    isReversed,
  );

  const handleToggleReverse = () => setIsReversed(prevValue => !prevValue);
  const shouldShowResetButton = isReversed
    || sortOrder !== SortType.DefaultSort;

  const handleReset = () => {
    setIsReversed(false);
    setSortOrder(SortType.DefaultSort);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortOrder !== SortType.Alphabet,
          })}
          onClick={() => (
            setSortOrder(SortType.Alphabet)
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortOrder !== SortType.Length,
          })}
          onClick={() => (
            setSortOrder(SortType.Length)
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleToggleReverse}
        >
          Reverse
        </button>

        {(shouldShowResetButton) && (
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
        {sortGoodsList.map(goodsItem => (
          <li key={goodsItem} data-cy="Good">
            {goodsItem}
          </li>
        ))}
      </ul>
    </div>
  );
};
