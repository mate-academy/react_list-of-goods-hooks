/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classN from 'classnames';

export enum SortType {
  None = 'none',
  Alphabet = 'alphabet',
  Length = 'length',
  Price = 'price',
}

// Масив об'єктів
export const goodsFromServer = [
  { name: 'Dumplings', price: 120, count: 3 },
  { name: 'Carrot', price: 30, count: 10 },
  { name: 'Eggs', price: 60, count: 12 },
  { name: 'Ice cream', price: 90, count: 6 },
  { name: 'Apple', price: 45, count: 8 },
  { name: 'Bread', price: 25, count: 15 },
  { name: 'Fish', price: 150, count: 2 },
  { name: 'Honey', price: 200, count: 1 },
  { name: 'Jam', price: 80, count: 5 },
  { name: 'Garlic', price: 35, count: 9 },
];

// Підготовка списку
function prepareGoods(
  goods: typeof goodsFromServer,
  { sortType, reverse }: { sortType: SortType; reverse: boolean },
) {
  const sorted = [...goods];

  switch (sortType) {
    case SortType.Alphabet:
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case SortType.Length:
      sorted.sort((a, b) => a.name.length - b.name.length);
      break;
    case SortType.Price:
      sorted.sort((a, b) => a.price - b.price);
      break;
    default:
      break;
  }

  if (reverse) {
    sorted.reverse();
  }

  return sorted;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [reverse, setReverse] = useState(false);
  const [query, setQuery] = useState('');

  // Обробники натискань для сортування
  function handleSort(newSort: SortType) {
    if (sortType === newSort) {
      // якщо натиснули ту саму кнопку — інвертуємо порядок
      setReverse(prev => !prev);
    } else {
      // якщо нове сортування — задаємо його і скидаємо reverse
      setSortType(newSort);
      setReverse(false);
    }
  }

  function resetSorting() {
    setSortType(SortType.None);
    setReverse(false);
    setQuery('');
  }

  // Фільтрація + сортування через useMemo
  const visibleGoods = useMemo(() => {
    const lowerQuery = query.toLowerCase().trim();

    const filtered = goodsFromServer.filter(good =>
      good.name.toLowerCase().includes(lowerQuery),
    );

    return prepareGoods(filtered, { sortType, reverse });
  }, [query, sortType, reverse]);

  return (
    <div className="section content">
      <div className="field">
        <label className="label">Search</label>
        <div className="control">
          <input
            type="text"
            className="input"
            placeholder="Enter product name..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="buttons">
        <button
          type="button"
          onClick={() => handleSort(SortType.Alphabet)}
          className={classN('button', 'is-info', {
            'is-light': sortType !== SortType.Alphabet,
          })}
        >
          Sort by name
        </button>

        <button
          type="button"
          onClick={() => handleSort(SortType.Length)}
          className={classN('button', 'is-info', {
            'is-light': sortType !== SortType.Length,
          })}
        >
          Sort by name length
        </button>

        <button
          type="button"
          onClick={() => handleSort(SortType.Price)}
          className={classN('button', 'is-info', {
            'is-light': sortType !== SortType.Price,
          })}
        >
          Sort by price
        </button>

        <button
          type="button"
          onClick={() => setReverse(prev => !prev)}
          className={classN('button', 'is-warning', {
            'is-light': !reverse,
          })}
        >
          Reverse
        </button>

        {(sortType !== SortType.None || reverse || query) && (
          <button
            type="button"
            onClick={resetSorting}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good.name} data-cy="Good">
            <strong>{good.name}</strong> — {good.price} ₴ ({good.count} pcs)
          </li>
        ))}
      </ul>
    </div>
  );
};
