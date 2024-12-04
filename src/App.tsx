import React from 'react';
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

enum SortType {
  None = 'none',
  Alphabet = 'alphabet',
  Length = 'length',
}

export const App: React.FC = () => {
  const [visibleGoods, setVisibleGoods] = useState([...goodsFromServer]);
  const [reversed, setReversed] = useState(false);
  const [sortMethod, setSortMethod] = useState<SortType>(SortType.None);

  const sortAlphabetically = () => {
    setSortMethod(SortType.Alphabet);
    setReversed(false);
    setVisibleGoods([...goodsFromServer].sort((a, b) => a.localeCompare(b)));
  };

  const sortByLength = () => {
    setSortMethod(SortType.Length);
    setReversed(false);
    setVisibleGoods([...goodsFromServer].sort((a, b) => b.length - a.length));
  };

  const reverseGoods = () => {
    setReversed(prev => !prev);
    setVisibleGoods(prevGoods => [...prevGoods].reverse());
  };

  const resetGoods = () => {
    setSortMethod(SortType.None);
    setReversed(false);
    setVisibleGoods([...goodsFromServer]);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortMethod === SortType.Alphabet ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortMethod === SortType.Length ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? SortType.None : 'is-light'}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {!(sortMethod === SortType.None && !reversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
