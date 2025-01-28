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
  const goods: string[] = goodsFromServer;
  const [sortType, setSortType] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  let visibleGoods = [...goods].sort((a, b) => {
    switch (sortType) {
      case 'alphabetically':
        return a.localeCompare(b);
      case 'byLength':
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods = visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortType === 'alphabetically'
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => {
            setSortType('alphabetically');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortType === 'byLength'
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => {
            setSortType('byLength');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed === true ? 'button is-info' : 'button is-info is-light'
          }
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {(sortType !== null || isReversed === true) && (
          <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortType(null);
                setIsReversed(false);
              }}
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
