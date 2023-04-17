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
  const [resetVisible, setResetVisible] = useState(false);
  const [isReversed, setReversed] = useState(false);
  const [sortBy, setSortBy] = useState('none');

  // onClickStart
  const sortName = () => {
    setSortBy('alphabet');
    setResetVisible(true);
  };

  const sortLength = () => {
    setSortBy('length');
    setResetVisible(true);
  };

  const reverse = () => {
    if (sortBy !== 'none') {
      setReversed(!isReversed);

      return;
    }

    setReversed(!isReversed);
    setResetVisible(!isReversed);
  };

  const reset = () => {
    setResetVisible(false);
    setReversed(false);
    setSortBy('none');
  };

  // onClickEnd

  // rendering thingsStart
  const visibleGoods = [...goodsFromServer];

  visibleGoods.sort((g1, g2) => {
    switch (sortBy) {
      case 'length':
        return g1.length - g2.length;

      case 'alphabet':
        return g1.localeCompare(g2);

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  // renderingThingsEnd
  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames({
            'button is-info': true,
            'is-light': sortBy !== 'alphabet',
          })}
          onClick={sortName}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames({
            'button is-success': true,
            'is-light': sortBy !== 'length',
          })}
          onClick={sortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames({
            'button is-warning': true,
            'is-light': !isReversed,
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {resetVisible && (
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
          {visibleGoods.map(good => (
            <li
              data-cy="Good"
              key={good}
            >
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
