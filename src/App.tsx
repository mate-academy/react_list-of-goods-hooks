import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

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
  ALPHABETICALLY = 'alphabetically',
  BY_LENGTH = 'by_length',
  DEFAULT = 'default',
}

const getPreparedGoods = (
  goods: string[],
  currentField: SortType,
  isReverse: boolean,
) => {
  let preparedGoods = [...goods];

  if (currentField === SortType.ALPHABETICALLY) {
    preparedGoods = preparedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (currentField === SortType.BY_LENGTH) {
    preparedGoods = preparedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReverse) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.DEFAULT);
  const [isReverse, setIsReverse] = useState(false);

  function handleSortClick(newSortField: SortType) {
    if (newSortField === sortField) {
      setIsReverse(isReverse);
    } else {
      setSortField(newSortField);
    }
  }

  const preparedGoods = getPreparedGoods(goodsFromServer, sortField, isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.ALPHABETICALLY,
          })}
          onClick={() => handleSortClick(SortType.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.BY_LENGTH,
          })}
          onClick={() => handleSortClick(SortType.BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {(sortField !== SortType.DEFAULT || isReverse) && (
          <button
            onClick={() => {
              setSortField(SortType.DEFAULT);
              setIsReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
