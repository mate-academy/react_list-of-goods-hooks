import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

type Goods = string[];
enum SortType {
  Alphabetically = 'Sort alphabetically',
  ByLength = 'Sort by length',
}

export const goodsFromServer: Goods = [
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
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [reversed, setReversed] = useState<boolean>(false);

  const visibleGoods: Goods = [...goodsFromServer];

  if (sortField === SortType.Alphabetically) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortField === SortType.ByLength) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (reversed) {
    visibleGoods.reverse();
  }

  const isModified: boolean = !!sortField || reversed;

  const sortOptions = [
    {
      label: SortType.Alphabetically,
      value: SortType.Alphabetically,
      className: 'is-info',
    },
    {
      label: SortType.ByLength,
      value: SortType.ByLength,
      className: 'is-success',
    },
  ];

  return (
    <div className="section content">
      <div className="buttons">
        {sortOptions.map(({ label, value, className }) => (
          <button
            key={value}
            type="button"
            className={`button ${className} ${sortField !== value ? 'is-light' : ''}`}
            onClick={() => setSortField(value)}
          >
            {label}
          </button>
        ))}

        <button
          type="button"
          className={`button is-warning ${!reversed ? 'is-light' : ''}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
