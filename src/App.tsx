import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
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

enum SortType {
  None = '',
  Alphabetically = 'Sort alphabetically',
  ByLength = 'Sort by length',
}

const SORT_FIELDS: SortType[] = [SortType.Alphabetically, SortType.ByLength];

export const App: React.FC = () => {
  const [sortedField, setSortedField] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const sortedGoods = [...goodsFromServer].sort((goodA, goodB) => {
    switch (sortedField) {
      case SortType.Alphabetically:
        return goodA.localeCompare(goodB);
      case SortType.ByLength:
        return goodA.length - goodB.length;
      default:
        return 0;
    }
  });

  const visibleGoods = isReversed ? [...sortedGoods].reverse() : sortedGoods;

  const handleSort = (field: SortType) => {
    setSortedField(field);
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setSortedField(SortType.None);
    setIsReversed(false);
  };

  const resetGoods = sortedField || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        {SORT_FIELDS.map(field => (
          <button
            key={field}
            type="button"
            className={cn('button', {
              'is-light': field !== sortedField,
              'is-info':
                field === SortType.Alphabetically && sortedField === field,
              'is-success':
                field === SortType.ByLength && sortedField === field,
            })}
            onClick={() => {
              handleSort(field);
            }}
          >
            {field}
          </button>
        ))}

        <button
          type="button"
          className={cn('button', {
            'is-warning': isReversed,
            'is-light': !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {resetGoods && (
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
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
