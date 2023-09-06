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

enum SortType {
  Default = '',
  Alphabetically = 'name',
  ByLength = 'length',
}

enum SortOrder {
  Default = 0,
  Ascending = 1,
  Descending = -1,
}

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  isReversed: SortOrder,
): string[] {
  const preparedGoods: string[] = [...goods];

  if (sortField !== SortType.Default) {
    preparedGoods.sort((firstItem, secondItem) => {
      if (sortField === SortType.Alphabetically) {
        return firstItem.localeCompare(secondItem);
      }

      if (sortField === SortType.ByLength) {
        return firstItem.length - secondItem.length;
      }

      return 0;
    });
  }

  if (isReversed === SortOrder.Ascending) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(SortOrder.Default);
  const isResetButtonVisible = sortField !== SortType.Default
    || isReversed === SortOrder.Ascending;

  const visibleGoods: string[]
    = getPreparedGoods(goodsFromServer, sortField, isReversed);

  function setSortReverse(): void {
    setSortField(SortType.Default);
    setIsReversed(SortOrder.Default);
  }

  function changeAscDesc(value: SortOrder): SortOrder {
    let typeOfOrder = value;

    if (typeOfOrder === SortOrder.Ascending) {
      typeOfOrder = SortOrder.Descending;
    } else {
      typeOfOrder = SortOrder.Ascending;
    }

    return typeOfOrder;
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortField !== SortType.Alphabetically },
          )}
          onClick={() => setSortField(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortField !== SortType.ByLength },
          )}
          onClick={() => setSortField(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning',
            { 'is-light': isReversed !== SortOrder.Ascending })}
          onClick={() => setIsReversed(changeAscDesc(isReversed))}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setSortReverse()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map((item) => {
            return (
              <li
                className="li"
                data-cy="Good"
                key={`${item} item`}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </ul>
    </div>
  );
};
