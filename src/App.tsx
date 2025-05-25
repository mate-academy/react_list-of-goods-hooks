import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Apple',
  'Eggs',
  'Ice cream',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];
enum SortType {
  Default,
  Alphabetical,
  Length,
  Reverse,
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState(goodsFromServer);

  const handleSort = (type: SortType) => {
    let sortedGoods = [...goodsFromServer];

    switch (type) {
      case SortType.Alphabetical:
        sortedGoods = [...goodsFromServer].sort();
        break;
      case SortType.Length:
        sortedGoods = [...goodsFromServer].sort((a, b) => a.length - b.length);
        break;
      case SortType.Reverse:
        sortedGoods = [...goodsFromServer].reverse();
        break;
      default:
        sortedGoods = goodsFromServer;
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
