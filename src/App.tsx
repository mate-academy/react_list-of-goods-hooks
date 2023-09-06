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
  Name,
  Length,
}

enum DisplayOrder {
  Normal,
  Reverse,
}

type DisplayOptions = {
  sortBy: SortType;
  displayOrder: DisplayOrder;
};

function getPreparedGoods(
  goods: string[],
  { sortBy, displayOrder }: DisplayOptions,
) {
  const preparedGoods = [...goods];

  if (sortBy !== SortType.NoSort) {
    preparedGoods.sort((a, b) => {
      switch (sortBy) {
        case SortType.Name:
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
  const [sortBy, setSortBy] = useState(SortType.NoSort);
  const [displayOrder, setDisplayOrder] = useState(DisplayOrder.Normal);

  const toggleDisplayOrder = () => {
    setDisplayOrder(
      displayOrder === DisplayOrder.Normal
        ? DisplayOrder.Reverse
        : DisplayOrder.Normal,
    );
  };

  const resetDisplayOptions = () => {
    setSortBy(SortType.NoSort);
    setDisplayOrder(DisplayOrder.Normal);
  };

  const isDisplayOptionsEnabled = sortBy !== SortType.NoSort
                                  || displayOrder !== DisplayOrder.Normal;

  const goods = getPreparedGoods(goodsFromServer, { sortBy, displayOrder });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SortType.Name,
          })}
          onClick={() => setSortBy(SortType.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SortType.Length,
          })}
          onClick={() => setSortBy(SortType.Length)}
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

        {isDisplayOptionsEnabled && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetDisplayOptions}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
