import React from 'react';
import { useState } from 'react';
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

enum SortOrder {
  Length,
  Alphabetical,
  None,
}
interface FormInitialValues {
  items: string[];
  isReverse: boolean;
  // sortByLength: boolean;
  // sortByAlph: boolean;
  sortOrder: SortOrder;
  reset: boolean;
}

const formInitialValues: FormInitialValues = {
  items: goodsFromServer,
  isReverse: false,
  // sortByLength: false,
  // sortByAlph: false,
  sortOrder: SortOrder.None,
  reset: false,
};

export const App: React.FC = () => {
  const [foodItems, setFoodItems] = useState(formInitialValues);

  const sortItemsByLength = (isReverse: boolean) => () => {
    const localItems = [...foodItems.items];

    const sortedItems = localItems.sort((a, b) => {
      if (isReverse) {
        return b.length - a.length;
      }

      return a.length - b.length;
    });

    setFoodItems(prev => {
      return {
        ...prev,
        items: sortedItems,
        sortByLength: true,
        sortByAlph: false,
        reset: true,
      };
    });
  };

  const sortItemsAlphabetically = (isReverse: boolean) => () => {
    const localItems = [...foodItems.items];

    const sortedItems = localItems.sort((a, b) => {
      if (isReverse) {
        return b.localeCompare(a);
      }

      return a.localeCompare(b);
    });

    setFoodItems(prev => {
      return {
        ...prev,
        items: sortedItems,
        sortByLength: false,
        sortByAlph: true,
        reset: true,
      };
    });
  };

  const reverseItems = () => {
    setFoodItems(prev => {
      const newItems = [...prev.items].reverse();
      const isInitial = newItems.join() === goodsFromServer.join();

      return {
        ...prev,
        items: newItems,
        isReverse: !prev.isReverse,
        reset: !isInitial,
      };
    });
  };

  const resetItems = () => {
    setFoodItems(() => ({ ...formInitialValues }));
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortItemsAlphabetically(foodItems.isReverse)}
          type="button"
          className={`button ${foodItems.sortByAlph ? 'is-info' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortItemsByLength(foodItems.isReverse)}
          type="button"
          className={`button ${foodItems.sortByLength ? 'is-success' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={reverseItems}
          type="button"
          className={`button ${foodItems.isReverse ? 'is-warning' : 'is-light'}`}
        >
          Reverse
        </button>

        {foodItems.reset && (
          <button
            onClick={resetItems}
            type="button"
            className="button is-danger"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {foodItems.items.map(item => (
            <li data-cy="Good" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
