import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
  const [isReversed, setReversed] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [goods, setGoods] = useState([...goodsFromServer]);

  const reset = () => {
    setGoods([...goodsFromServer]);
    setReversed(false);
    setSortBy('');
  };

  const reverse = () => {
    setGoods([...goods].reverse());
    setReversed(!isReversed);
  };

  const sortByLength = () => {
    setGoods([...goods].sort((g1, g2) => g1.length - g2.length));
    setSortBy('length');
  };

  const sortByAlphabet = () => {
    setGoods([...goods].sort((g1, g2) => g1.localeCompare(g2)));
    setSortBy('alphabet');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', {
            'is-info is-light': sortBy !== 'alphabet',
            'is-info': sortBy === 'alphabet',
          })}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortByLength}
          className={classNames('button', {
            'is-success is-light': sortBy !== 'length',
            'is-success': sortBy === 'length',
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', {
            'is-warning is-light': !isReversed,
            'is-warning': isReversed,
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        <ul>
          {goods.map(good => (
            <li key={good}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
