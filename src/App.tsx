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
  None = 'NONE',
  Alphabetical = 'ALPHABETICAL',
  Length = 'LENGTH',
}

interface Values {
  items: string[];
  sortType: SortType;
  isReverse: boolean;
}

const initialValues: Values = {
  items: [...goodsFromServer],
  sortType: SortType.None,
  isReverse: false,
};

export const App: React.FC = () => {
  const [foodItems, setFoodItems] = useState(initialValues);

  const handleSortByLength = () => {
    const localItems = [...foodItems.items];

    const sortedItems = localItems.sort((a, b) => {
      return foodItems.isReverse ? b.length - a.length : a.length - b.length;
    });

    setFoodItems(prev => {
      return {
        ...prev,
        items: sortedItems,
        sortType: SortType.Length,
      };
    });
  };

  const handleSortByAlph = () => {
    const localItems = [...foodItems.items];

    const sortedItems = localItems.sort((a, b) => {
      return foodItems.isReverse ? b.localeCompare(a) : a.localeCompare(b);
    });

    setFoodItems(prev => {
      return {
        ...prev,
        items: sortedItems,
        sortType: SortType.Alphabetical,
      };
    });
  };

  const handleReverse = () => {
    setFoodItems(prev => {
      const newItems = [...prev.items].reverse();
      const isInitial = newItems.join() === goodsFromServer.join();

      return {
        ...prev,
        items: newItems,
        isReverse: !prev.isReverse,
        sortType: isInitial ? SortType.None : prev.sortType,
      };
    });
  };

  const handleReset = () => {
    setFoodItems({ ...initialValues });
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleSortByAlph}
          type="button"
          className={`button ${
            foodItems.sortType === SortType.Alphabetical
              ? 'is-info'
              : 'is-light'
          }`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleSortByLength}
          type="button"
          className={`button ${
            foodItems.sortType === SortType.Length ? 'is-success' : 'is-light'
          }`}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={`button ${foodItems.isReverse ? 'is-warning' : 'is-light'}`}
        >
          Reverse
        </button>

        {foodItems.sortType !== SortType.None || foodItems.isReverse ? (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {foodItems.items.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
