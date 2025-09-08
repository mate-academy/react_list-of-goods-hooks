import React, { useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

type Good = {
  name: string;
  price: number;
};

enum SortType {
  Default = 'Default',
  Alphabetically = 'Alphabetically',
  Price = 'Price',
}

export const goodsFromServer: Good[] = [
  { name: 'Dumplings', price: 50 },
  { name: 'Carrot', price: 16 },
  { name: 'Eggs', price: 30 },
  { name: 'Ice cream', price: 120 },
  { name: 'Apple', price: 20 },
  { name: 'Bread', price: 25 },
  { name: 'Fish', price: 80 },
  { name: 'Honey', price: 100 },
  { name: 'Jam', price: 60 },
  { name: 'Garlic', price: 12 },
];

export const App: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<SortType>(SortType.Default);
  const [query, setQuery] = useState<string>('');

  const goods = useMemo(() => {
    const q = query.trim().toLowerCase();

    // começa na ordem original e filtra pelo nome
    let prepared = goodsFromServer.filter(g =>
      g.name.toLowerCase().includes(q)
    );

    switch (sortOrder) {
      case SortType.Alphabetically:
        prepared = [...prepared].sort((a, b) => a.name.localeCompare(b.name));
        break;

      case SortType.Price:
        prepared = [...prepared].sort((a, b) => a.price - b.price);
        break;

      default:
        // Default: mantém a ordem original (já filtrada)
        break;
    }

    return prepared;
  }, [sortOrder, query]);

  function reset() {
    setSortOrder(SortType.Default);
    setQuery('');
  }

  return (
    <div className="section content">
      <div className="field">
        <label className="label" htmlFor="search">Search</label>
        <div className="control">
          <input
            id="search"
            data-cy="Search"
            className="input"
            type="text"
            placeholder="Search goods..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="buttons">
        <button
          data-cy="SortByName"
          type="button"
          className={`button is-info ${sortOrder !== SortType.Alphabetically && 'is-light'}`}
          onClick={() => setSortOrder(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          data-cy="SortByPrice"
          type="button"
          className={`button is-success ${sortOrder !== SortType.Price && 'is-light'}`}
          onClick={() => setSortOrder(SortType.Price)}
        >
          Sort by price
        </button>

        {(sortOrder !== SortType.Default || query) && (
          <button
            data-cy="Reset"
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good.name}>
            {good.name} — {good.price}
          </li>
        ))}
      </ul>
    </div>
  );
};
