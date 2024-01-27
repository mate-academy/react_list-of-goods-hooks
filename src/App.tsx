import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  Alphabetical = 'Alphabetical',
  Length = 'Length',
  Reverse = 'Reverse',
}

export const goodsFromServer: string[] = [
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
  const [goods, setGoods] = useState<string[]>(goodsFromServer);

  const handleSort = (type: SortType | null) => {
    let sortedGoods: string[];

    switch (type) {
      case SortType.Alphabetical:
        sortedGoods = [...goods].sort();
        break;
      case SortType.Length:
        sortedGoods = [...goods].sort((a, b) => a.length - b.length);
        break;
      case SortType.Reverse:
        sortedGoods = [...goods].reverse();
        break;
      default:
        sortedGoods = [...goodsFromServer];
    }

    setGoods(sortedGoods);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className="button is-info is-light"
          onClick={() => handleSort(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="button is-success is-light"
          onClick={() => handleSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-warning is-light"
          onClick={() => handleSort(SortType.Reverse)}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => handleSort(null)}
        >
          Reset
        </button>
      </div>

      <ul>
        {goods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
