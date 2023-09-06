import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
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
  NoSort,
  Alphabetically,
  Length,
}

enum DisplayOrder {
  Normal,
  Reverse,
}

function getPreparedGoods(
  goods: string[],
  sortType: SortType,
  displayOrder: DisplayOrder,
) {
  const preparedGoods = [...goods];

  if (sortType !== SortType.NoSort) {
    preparedGoods.sort((a, b) => {
      switch (sortType) {
        case SortType.Alphabetically:
          return a.localeCompare(b);

        case SortType.Length:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (displayOrder === DisplayOrder.Reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NoSort);
  const [displayOrder, setDisplayOrder] = useState(DisplayOrder.Normal);

  const toggleDisplayOrder = () => {
    setDisplayOrder(prevOrder => {
      return prevOrder === DisplayOrder.Normal
        ? DisplayOrder.Reverse
        : DisplayOrder.Normal;
    });
  };

  const handleResetButton = () => {
    setSortType(SortType.NoSort);
    setDisplayOrder(DisplayOrder.Normal);
  };

  const isResetButtonActive = sortType || displayOrder;

  const preparedGoods = getPreparedGoods(
    goodsFromServer,
    sortType,
    displayOrder,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SortType.Alphabetically,
          })}
          onClick={() => setSortType(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SortType.Length,
          })}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': displayOrder !== DisplayOrder.Reverse,
          })}
          onClick={toggleDisplayOrder}
        >
          Reverse
        </button>

        {isResetButtonActive && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetButton}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
