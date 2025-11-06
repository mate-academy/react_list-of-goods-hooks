import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

type Good = {
  name: string;
  age: number;
  price: number;
};

export const goodsFromServer: Good[] = [
  { name: 'Dumplings', age: 2, price: 12.5 },
  { name: 'Carrot', age: 1, price: 3.2 },
  { name: 'Eggs', age: 3, price: 6.0 },
  { name: 'Ice cream', age: 5, price: 15.0 },
  { name: 'Apple', age: 2, price: 4.5 },
  { name: 'Bread', age: 1, price: 5.0 },
  { name: 'Fish', age: 4, price: 20.0 },
  { name: 'Honey', age: 6, price: 25.0 },
  { name: 'Jam', age: 3, price: 10.0 },
  { name: 'Garlic', age: 2, price: 2.5 },
];

enum SortType {
  None = '',
  Name = 'name',
  Age = 'age',
  Price = 'price',
}

function getPreparedGoods(
  goods: Good[],
  sortField: SortType,
  isReversed: boolean,
): Good[] {
  const preparedGoods = [...goods];

  if (sortField === SortType.Name) {
    preparedGoods.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortField === SortType.Age) {
    preparedGoods.sort((a, b) => a.age - b.age);
  }

  if (sortField === SortType.Price) {
    preparedGoods.sort((a, b) => a.price - b.price);
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);
  const isSorted = sortField !== SortType.None || isReversed;

  const handleSort = (field: SortType) => {
    setSortField(field);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.Name ? '' : 'is-light'}`}
          onClick={() => handleSort(SortType.Name)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success ${sortField === SortType.Age ? '' : 'is-light'}`}
          onClick={() => handleSort(SortType.Age)}
        >
          Sort by age
        </button>
        <button
          type="button"
          className={`button is-pricy ${sortField === SortType.Price ? '' : 'is-light'}`}
          onClick={() => handleSort(SortType.Price)}
        >
          Sort by price
        </button>
        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isSorted && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortField(SortType.None);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
