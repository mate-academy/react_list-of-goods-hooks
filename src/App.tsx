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
  Alphabetically,
  ByLength,
  Reverse,
  Reset
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Reset);

  let copyOfGoods = [...goodsFromServer];

  switch (sortField) {
    case SortType.Alphabetically:
      copyOfGoods = [...copyOfGoods].sort((a, b) => a.localeCompare(b));
      break;
    case SortType.ByLength:
      copyOfGoods = [...copyOfGoods].sort((a, b) => a.length - b.length);
      break;
    case SortType.Reverse:
      copyOfGoods = [...copyOfGoods].reverse();
      break;
    case SortType.Reset: 
      default:
        copyOfGoods = [...goodsFromServer];
        break;
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.Alphabetically ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.Alphabetically)}
          >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SortType.ByLength ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${sortField === SortType.Reverse ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.Reverse)}
        >
          Reverse
        </button>

        <button
          type="button"
          className={`button is-danger ${sortField === SortType.Reset ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.Reset)}
        >
          Reset
        </button>
      </div>

      <ul>
        <ul>
          {copyOfGoods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))
          }
        </ul>
      </ul>
    </div>
  );
};
