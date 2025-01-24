import React, { useState } from 'react';
import 'bulma/css/bulma.css';
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
  None = 'none',
  Alphabetically = 'alphabetically',
  Length = 'length',
}

const prepareGoodsList = (
  goods: string[],
  sortOrder: SortType,
  isReversed: boolean,
): string[] => {
  const sortedGoods = [...goods];

  if (sortOrder !== SortType.None) {
    sortedGoods.sort((item1, item2) => {
      switch (sortOrder) {
        case SortType.Alphabetically:
          return item1.localeCompare(item2);
        case SortType.Length:
          return item1.length - item2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const goodsToRender = prepareGoodsList(goodsFromServer, sortOrder, isReversed);

  const sortAlphabetically = () => setSortOrder(SortType.Alphabetically);
  const sortByLength = () => setSortOrder(SortType.Length);
  const reverseOrder = () => setIsReversed(prev => !prev);
  const resetOrder = () => {
    setSortOrder(SortType.None);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortOrder === SortType.Alphabetically ? '' : 'is-light'
            }`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortOrder === SortType.Length ? '' : 'is-light'
            }`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseOrder}
        >
          Reverse
        </button>

        {(sortOrder !== SortType.None || isReversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetOrder}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsToRender.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
