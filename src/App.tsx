import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  Alphabetically,
  Length,
  Reverse,
  Reset
}

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

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);

  const sortGoods = (currentSortType: SortType) => {
    let sortedGoods: string[] = [];
    switch (currentSortType) {
      case SortType.Alphabetically:
        sortedGoods = [...goods].sort();
        setGoods(sortedGoods);
        break;
      case SortType.Length:
        sortedGoods = [...goods].sort((a, b) => a.length - b.length);
        setGoods(sortedGoods);
        break;
      case SortType.Reverse:
        sortedGoods = [...goods].reverse();
        setGoods(sortedGoods);
        break;
      case SortType.Reset:
        setGoods([...goodsFromServer]);
        break;
      default:
        break;
    }
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button type="button" onClick={() => sortGoods(SortType.Alphabetically)} className="button is-info is-light">
          Sort alphabetically
        </button>

        <button type="button" onClick={() => sortGoods(SortType.Length)} className="button is-success is-light">
          Sort by length
        </button>

        <button type="button" onClick={() => sortGoods(SortType.Reverse)} className="button is-warning is-light">
          Reverse
        </button>

        <button type="button" onClick={() => sortGoods(SortType.Reset)} className="button is-danger is-light">
          Reset
        </button>
      </div>

      <ul>
          {goods.map((good) => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
      </ul>
    </div>
  );
};
