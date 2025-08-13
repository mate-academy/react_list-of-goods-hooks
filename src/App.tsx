import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  Default,
  Alphabetically,
  Length,
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

export const App: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  function resetSorting() {
    setSortOrder(SortType.Default);
    setIsReversed(false);
  }

  function sortByType(type: SortType): string[] {
    const orders = [...goodsFromServer];

    switch (type) {
      case SortType.Alphabetically: {
        orders.sort();
        break;
      }

      case SortType.Length: {
        orders.sort((a, b) => a.length - b.length);
        break;
      }

      default:
        break;
    }

    if (isReversed) {
      orders.reverse();
    }

    return orders;
  }

  const goods = sortByType(sortOrder);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortOrder !== SortType.Alphabetically && 'is-light'}`}
          onClick={() => setSortOrder(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortOrder !== SortType.Length && 'is-light'}`}
          onClick={() => setSortOrder(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed && 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortOrder || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSorting}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(order => (
          <li data-cy="Good" key={order}>
            {order}
          </li>
        ))}
      </ul>
    </div>
  );
};
