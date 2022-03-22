import classNames from 'classnames';
import React, { useState } from 'react';
import './App.css';

const goodsFromServer: string[] = [
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

const App: React.FC = () => {
  const [start, show] = useState(false);
  const [isReversed, reverse] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const reset = () => {
    reverse(false);
    setSortBy('');
  };

  const visibleGoods = [...goodsFromServer];

  if (sortBy) {
    visibleGoods.sort((a, b) => {
      switch (sortBy) {
        case 'alpha':
          return a.localeCompare(b);
        case 'length':
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className={classNames('App', {
      'App--before': !start,
      'App--after': start,
    })}
    >
      {!start
        ? (
          <button
            type="button"
            onClick={() => show(true)}
            className="button button--start"
          >
            Start
          </button>
        )
        : (
          <>
            <ul className="goods-list">
              {visibleGoods.map(good => (
                <li className="goods-list__item">{good}</li>
              ))}
            </ul>
            <div className="buttons">
              <button
                type="button"
                onClick={() => reverse(!isReversed)}
                className="button"
              >
                reverse
              </button>
              <button
                type="button"
                onClick={() => setSortBy('alpha')}
                className="button"
              >
                Sort alphabetically
              </button>
              <button
                type="button"
                onClick={() => setSortBy('length')}
                className="button"
              >
                Sort by length
              </button>
              <button
                type="button"
                onClick={reset}
                className="button"
              >
                Reset
              </button>
            </div>
          </>
        )}
    </div>
  );
};

export default App;
