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
  Default = 'Default',
  Alphabetical = 'Alphabetical',
  Length = 'Length',
  Reverse = 'Reverse',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);

  const handleSort = (type: SortType) => {
    switch (type) {
      case SortType.Alphabetical:
        setGoods([...goods].sort((a, b) => a.localeCompare(b)));
        break;

      case SortType.Length:
        setGoods([...goods].sort((a, b) => a.length - b.length));
        break;

      case SortType.Reverse:
        setGoods([...goods].reverse());
        break;

      case SortType.Default:
      default:
        setGoods([...goodsFromServer]);
        break;
    }
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
          onClick={() => handleSort(SortType.Default)}
        >
          Reset
        </button>
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
