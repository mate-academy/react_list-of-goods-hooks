import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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

export const App = () => {
  const originalGoods = goodsFromServer;

  const [baseGoods, setBaseGoods] = useState(originalGoods);
  const [isReverted, setIsReverted] = useState(false);
  const [isActive, setIsActive] = useState('original');

  const isOriginalOrder =
    baseGoods.length === originalGoods.length &&
    baseGoods.every((g, i) => g === originalGoods[i]);

  const renderGoods = isReverted ? [...baseGoods].reverse() : baseGoods;

  const sortByName = () => {
    const sorted = [...originalGoods].sort((a, b) => a.localeCompare(b));

    setBaseGoods(sorted);
    setIsReverted(false);
    setIsActive('alphabetical');
  };

  const sortByLength = () => {
    const sorted = [...originalGoods].sort((a, b) => a.length - b.length);

    setBaseGoods(sorted);
    setIsReverted(false);
    setIsActive('length');
  };

  const toggleReverse = () => {
    setIsReverted(prev => !prev);
  };

  const resetGoods = () => {
    setBaseGoods(originalGoods);
    setIsReverted(false);
    setIsActive('original');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isActive !== 'alphabetical' ? 'is-light' : ''}`}
          onClick={sortByName}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isActive !== 'length' ? 'is-light' : ''}`}
          onClick={sortByLength}
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
            onClick={resetGoods}
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
