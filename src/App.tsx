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

enum SortType {
  alphabet = 'alphabet',
  length = 'length',
  reverse = 'reverse',
  default = '',
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortType.default);
  const [reversed, setReversed] = useState(false);

  let [...visibleGoods]: string[] = goodsFromServer;

  visibleGoods = visibleGoods.sort((good1, good2) => {
    switch (sortBy) {
      case SortType.alphabet:
        return good1.localeCompare(good2);

      case SortType.length:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (reversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-active': sortBy === SortType.alphabet,
            'is-light': sortBy !== SortType.alphabet,
          })}
          onClick={() => {
            setSortBy(SortType.alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-active': sortBy === SortType.length,
            'is-light': sortBy !== SortType.length,
          })}
          onClick={() => {
            setSortBy(SortType.length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-active': sortBy === SortType.reverse,
            'is-light': reversed !== true,
          })}
          onClick={() => {
            setReversed(prev => !prev);
          }}
        >
          Reverse
        </button>

        {(sortBy || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(SortType.default);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good, index) => (
          <li key={index} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
