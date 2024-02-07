import React, { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

import { SortType } from './SortType';

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

function getPreparedGoods(
  goods: string[],
  sortValue: string,
  reverseValue: boolean,
) {
  const preparedGoods = [...goods];

  if (sortValue) {
    preparedGoods.sort((val1, val2) => {
      switch (sortValue) {
        case SortType.Alphabetically:
          return val1.localeCompare(val2);
        case SortType.Length:
          return val1.length - val2.length;
        default:
          return 0;
      }
    });
  }

  if (reverseValue) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortValue, setSortValue] = useState('');
  const [reverseValue, setReverseValue] = useState(false);

  const getSortedGoods = getPreparedGoods(goodsFromServer,
    sortValue, reverseValue);

  const handleClickSortAlphabetically = () => {
    setSortValue(SortType.Alphabetically);
  };

  const handleClickSortLength = () => {
    setSortValue(SortType.Length);
  };

  const handleClickReverse = () => {
    setReverseValue(prev => !prev);
  };

  const handleClickReset = () => {
    setSortValue(SortType.Reset);
    setReverseValue(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            { 'is-light': sortValue !== SortType.Alphabetically },
            'button is-info',
          )}
          onClick={handleClickSortAlphabetically}

        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            { 'is-light': sortValue !== SortType.Length },
            'button is-success',
          )}
          onClick={handleClickSortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            { 'is-light': !reverseValue },
            'button is-warning',
          )}
          onClick={handleClickReverse}
        >
          Reverse
        </button>

        {(reverseValue || sortValue !== '') && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleClickReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {getSortedGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
