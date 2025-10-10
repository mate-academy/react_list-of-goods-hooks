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

export enum SortType {
  None = 'NONE',
  Alphabetical = 'ALPHABETICAL',
  ByLength = 'BY_LENGTH',
}

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>([...goodsFromServer]);
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [reversed, setReversed] = useState(false);

  const handleSort = (type: SortType) => {
    setSortType(type);
    const sortedGoods = [...goodsFromServer];

    if (type === SortType.Alphabetical) {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (type === SortType.ByLength) {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (reversed) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
  };

  const handleReverse = () => {
    setGoods(prev => [...prev].reverse());
    setReversed(prev => !prev);
  };

  const handleReset = () => {
    setGoods([...goodsFromServer]);
    setSortType(SortType.None);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.Alphabetical ? '' : 'is-light'}`}
          onClick={() => handleSort(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.ByLength ? '' : 'is-light'}`}
          onClick={() => handleSort(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.None || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
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
