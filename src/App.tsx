import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

enum SortType {
  Name = 'name',
  Length = 'length',
  Default = '',
}

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

const sortGoods = (
  goods: string[],
  sortingField: SortType,
  isReversed: boolean,
) => {
  const sortedGoods = [...goods].sort((good1, good2) => {
    switch (sortingField) {
      case SortType.Name:
        return good1.localeCompare(good2);

      case SortType.Length:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  return isReversed
    ? sortedGoods.reverse()
    : sortedGoods;
};

export const App: React.FC = () => {
  const [sortingField, setSortingField] = useState(SortType.Default);
  const [isReversed, changeSortingOrder] = useState(false);

  const toggleSortingOrder = () => (
    changeSortingOrder(currentOrder => !currentOrder)
  );
  const sortedGoods = sortGoods(goodsFromServer, sortingField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortingField !== SortType.Name },
          )}
          onClick={() => setSortingField(SortType.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortingField !== SortType.Length },
          )}
          onClick={() => setSortingField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': isReversed !== true },
          )}
          onClick={() => toggleSortingOrder()}
        >
          Reverse
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-danger',
            'is-light',
            {
              hidden: (sortingField === SortType.Default)
                && (isReversed === false),
            },
          )}
          onClick={() => {
            setSortingField(SortType.Default);
            changeSortingOrder(false);
          }}
        >
          Reset
        </button>
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
