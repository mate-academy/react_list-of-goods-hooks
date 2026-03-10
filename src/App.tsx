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

type Good = {
  id: number;
  name: string;
};

enum SortType {
  Default = 'Default',
  ByName = 'ByName',
  ByLength = 'ByLength',
  Reverse = 'Reverse',
}
const initialGoods: Good[] = goodsFromServer.map((name, i) => ({
  id: i + 1,
  name,
}));

export const App: React.FC = () => {
  const [goods, setGoods] = useState<Good[]>(initialGoods);
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isSorted, setIsSorted] = useState(false);

  const handleSortByName = () => {
    setGoods(prev => [...prev].sort((a, b) => a.name.localeCompare(b.name)));
    setSortType(SortType.ByName);
    setIsSorted(true);
  };

  const handleSortByLength = () => {
    setGoods(prev => [...prev].sort((a, b) => a.name.length - b.name.length));
    setSortType(SortType.ByLength);
    setIsSorted(true);
  };

  const handleReverse = () => {
    setGoods(prev => prev.slice().reverse());
    setSortType(SortType.Reverse);
    setIsSorted(true);
  };

  const handleReset = () => {
    setGoods(initialGoods.slice());
    setSortType(SortType.Default);
    setIsSorted(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleSortByName}
          type="button"
          className={`button is-info is-light ${sortType === SortType.ByName ? 'is-active' : ''}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleSortByLength}
          type="button"
          className={`button is-success is-light ${sortType === SortType.ByLength ? 'is-active' : ''}`}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={`button is-warning is-light ${sortType === SortType.Reverse ? 'is-active' : ''}`}
        >
          Reverse
        </button>

        {isSorted && (
          <button
            onClick={handleReset}
            type="button"
            className={`button is-danger is-light ${sortType === SortType.Default ? 'is-active' : ''}`}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(g => (
          <li key={g.id} data-cy="Good">
            {g.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
