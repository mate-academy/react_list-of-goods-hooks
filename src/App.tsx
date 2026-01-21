import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import React from 'react';

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

enum SortType {
  Alphabetical,
  Length,
  Original,
}

export const App: React.FC = () => {
  const originalGoods: string[] = goodsFromServer;

  const [isReverted, setIsReverted] = useState(false);
  const [isActive, setIsActive] = useState<SortType>(SortType.Original);

  const isOriginalOrder: boolean = isActive === SortType.Original;

  const toggleReverse = () => {
    setIsReverted(prev => !prev);
  };

  const sortedGoods = [...originalGoods];

  if (isActive === SortType.Alphabetical) {
    sortedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (isActive === SortType.Length) {
    sortedGoods.sort((a, b) => a.length - b.length);
  }

  const renderGoods: string[] = isReverted
    ? [...sortedGoods].reverse()
    : sortedGoods;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isActive !== SortType.Alphabetical ? 'is-light' : ''}`}
          onClick={() => setIsActive(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isActive !== SortType.Length ? 'is-light' : ''}`}
          onClick={() => setIsActive(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReverted ? 'is-light' : ''}`}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsActive(SortType.Original);
              setIsReverted(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {renderGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
