import React, { useState } from 'react';
import classNames from 'classnames';

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
  let goods = [...goodsFromServer];
  const ALPHABETICALLY: string = 'alphabetically';
  const BY_LENGTH: string = 'by length';
  const RESET: string = 'reset';
  const [sortedGoods, setSortedGoods] = useState('');
  const [isReverseClicked, setReverseClicked] = useState(false);
  const [reverse, setReversed] = useState(false);

  function applySortingAndReversing() {
    if (sortedGoods === ALPHABETICALLY) {
      goods = [...goods].sort((goodA, goodB) => goodA.localeCompare(goodB));
    }

    if (sortedGoods === BY_LENGTH) {
      goods = [...goods].sort((goodA, goodB) => goodA.length - goodB.length);
    }

    if (reverse) {
      goods = [...goods].reverse();
    }

    if (sortedGoods === RESET) {
      goods = [...goodsFromServer];
    }
  }

  if (isReverseClicked) {
    goods = [...goods].reverse();
    setReverseClicked(false);
  } else {
    applySortingAndReversing();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortedGoods !== ALPHABETICALLY,
          })}
          onClick={() => setSortedGoods(ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortedGoods !== BY_LENGTH,
          })}
          onClick={() => setSortedGoods(BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': reverse === false,
          })}
          onClick={() => {
            setReversed(!reverse);
            setReverseClicked(true);
          }}
        >
          Reverse
        </button>
        {goods.some((good, index) => good !== goodsFromServer[index]) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortedGoods(RESET);
              setReversed(false);
            }}
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
