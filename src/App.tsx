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

export const App: React.FC = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [isSortedAlpha, setSortedAlpha] = useState(false);
  const [isSortedLen, setSortedLen] = useState(false);
  const [isReversed, setIsReversed] = useState(false);

  function sortAlphabetically() {
    setGoods([...goodsFromServer].sort((a, b) => a.localeCompare(b)));
    setSortedAlpha(true);
    setSortedLen(false);
    setIsReversed(false);
  }

  function sortLength() {
    setGoods([...goodsFromServer].sort((a, b) => a.length - b.length));
    setSortedLen(true);
    setSortedAlpha(false);
    setIsReversed(false);
  }

  function reverse() {
    setGoods([...goods].reverse());
    setIsReversed(true);
    setSortedAlpha(false);
    setSortedLen(false);
  }

  function reset() {
    setGoods([...goodsFromServer]);
    setSortedAlpha(false);
    setSortedLen(false);
    setIsReversed(false);
  }


  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isSortedAlpha ? "active-btn" : "is-light"}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isSortedLen ? "active-btn" : "is-light"}`}
          onClick={sortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? "active-btn" : "is-light"}`}
          onClick={reverse}
        >
          Reverse
        </button>
        {(isReversed || isSortedAlpha || isSortedLen) && 
          <button type="button" className="button is-danger is-light" onClick={reset}>
            Reset
          </button>
        }
      </div>

      <ul>
        {goods.map((item) => 
          <li key={item} data-cy="Good">{item}</li>
        )}
      </ul>
    </div>
  );
};
