import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  Alphabetical = 'alphabetical',
  Length = 'length',
  Reverse = 'reverse',
}

interface Goods {
  id: number;
  name: string;
}

const goodsFromServer: Goods[] = [
  { id: 1, name: 'Dumplings' },
  { id: 2, name: 'Carrot' },
  { id: 3, name: 'Eggs' },
  { id: 4, name: 'Ice cream' },
  { id: 5, name: 'Apple' },
  { id: 6, name: 'Bread' },
  { id: 7, name: 'Fish' },
  { id: 8, name: 'Honey' },
  { id: 9, name: 'Jam' },
  { id: 10, name: 'Garlic' },
];

export const App: React.FC = () => {
  const [goods, setGoods] = useState<Goods[]>(goodsFromServer);
  const [activeButton, setActiveButton] = useState<SortType | null>(null);

  const handleSortAlphabetically = () => {
    const sortedGoods = [...goods].sort((a, b) => a.name.localeCompare(b.name));

    setGoods(sortedGoods);
    setActiveButton(SortType.Alphabetical);
  };

  const handleSortByLength = () => {
    const sortedGoods = [...goods].sort((a, b) => a.name.length
      - b.name.length);

    setGoods(sortedGoods);
    setActiveButton(SortType.Length);
  };

  const handleReverse = () => {
    const reversedGoods = [...goods].reverse();

    setGoods(reversedGoods);
    setActiveButton(SortType.Reverse);
  };

  const handleReset = () => {
    setGoods(goodsFromServer);
    setActiveButton(null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeButton === SortType.Alphabetical ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeButton === SortType.Length ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${activeButton === SortType.Reverse ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {activeButton && (
          <button
            type="button"
            className={`button is-danger ${activeButton === null ? '' : 'is-light'}`}
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good) => (
          <li key={good.id} data-cy="Good">
            {good.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
