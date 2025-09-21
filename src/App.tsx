import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

type Good = {
  id: number;
  name: string;
  price: number;
};

export const goodsFromServer: Good[] = [
  { id: 1, name: 'Dumplings', price: 50 },
  { id: 2, name: 'Carrot', price: 15 },
  { id: 3, name: 'Eggs', price: 20 },
  { id: 4, name: 'Ice cream', price: 35 },
  { id: 5, name: 'Apple', price: 10 },
  { id: 6, name: 'Bread', price: 25 },
  { id: 7, name: 'Fish', price: 60 },
  { id: 8, name: 'Honey', price: 45 },
  { id: 9, name: 'Jam', price: 30 },
  { id: 10, name: 'Garlic', price: 12 },
];

enum SortType {
  None = 'none',
  Alpha = 'alpha',
  Length = 'length',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<Good[]>([...goodsFromServer]);
  const [activeSort, setActiveSort] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);
  const [query, setQuery] = useState('');

  const applySorting = (type: SortType) => {
    const sorted = [...goodsFromServer];

    if (type === SortType.Alpha) {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === SortType.Length) {
      sorted.sort((a, b) => a.name.length - b.name.length);
    }

    if (isReversed) {
      sorted.reverse();
    }

    setGoods(sorted);
    setActiveSort(type);
  };

  const reverseList = () => {
    setGoods(prev => [...prev].reverse());
    setIsReversed(prev => !prev);
  };

  const resetList = () => {
    setGoods([...goodsFromServer]);
    setActiveSort(SortType.None);
    setIsReversed(false);
    setQuery('');
  };

  const isModified =
    activeSort !== SortType.None || isReversed || query.trim() !== '';

  const filteredGoods = goods.filter(good =>
    good.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="section content">
      <div className="field">
        <label className="label" htmlFor="filterInput">
          Filter goods
        </label>
        <div className="control">
          <input
            id="filterInput"
            type="text"
            className="input"
            placeholder="Type to filter..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="buttons">
        <button
          type="button"
          className={`button is-info${
            activeSort === SortType.Alpha ? '' : ' is-light'
          }`}
          onClick={() => applySorting(SortType.Alpha)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success${
            activeSort === SortType.Length ? '' : ' is-light'
          }`}
          onClick={() => applySorting(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning${isReversed ? '' : ' is-light'}`}
          onClick={reverseList}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetList}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {filteredGoods.map(good => (
          <li key={good.id} data-cy="Good">
            {good.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
