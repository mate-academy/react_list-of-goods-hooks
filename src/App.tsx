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
  Alphabetically = 'alphabetically',
  ByLength = 'length',
}

enum SortOrder {
  Default = 0,
  Ascending = 1,
  Descending = -1,
}

function getPreparedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: SortOrder,
): string[] {
  const preparedGoods: string[] = [...goods];

  if (sortType !== SortType.Default) {
    preparedGoods.sort((item1, item2) => {
      if (sortType === SortType.Alphabetically) {
        return item1.localeCompare(item2);
      }

      if (sortType === SortType.ByLength) {
        return item1.length - item2.length;
      }

      return 0;
    });
  }

  if (isReversed === SortOrder.Ascending) {
    preparedGoods.reverse();
  }

  return preparedGoods;
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

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(SortOrder.Default);
  const isResetButtonVisible = sortType || isReversed === SortOrder.Ascending;

  const sortedGoods: string[]
    = getPreparedGoods(goodsFromServer, sortType, isReversed);

  function handleButtonReset(): void {
    setSortType(SortType.Default);
    setIsReversed(SortOrder.Default);
  }

  function changeButtonIsWarningClass(order: SortOrder): string {
    return classNames(
      'button is-warning',
      { 'is-light': order !== SortOrder.Ascending },
    );
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.Alphabetically },
          )}
          onClick={() => setSortType(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-success',
            { 'is-light': sortType !== SortType.ByLength },
          )}
          onClick={() => setSortType(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={changeButtonIsWarningClass(isReversed)}
          onClick={() => setIsReversed(changeAscDesc(isReversed))}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleButtonReset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {sortedGoods.map((item) => (
            <li
              className="li"
              data-cy="Good"
              key={`${item}_item`}
            >
              {item}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
