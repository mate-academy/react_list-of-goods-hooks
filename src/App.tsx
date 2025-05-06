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

enum SortType {
  ABC = 'abc',
  LENGTH = 'length',
  REVERSE = 'reverse',
  RESET = 'reset',
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.RESET);
  const [reversed, setReversed] = useState(false);

  let visibleGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortField) {
      case SortType.ABC:
        return good1.localeCompare(good2);
      case SortType.LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reversed) {
    visibleGoods = visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          key={SortType.ABC}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SortType.ABC,
          })}
          onClick={() => {
            setSortField(SortType.ABC);
          }}
        >
          Sort alphabetically
        </button>

        <button
          key={SortType.LENGTH}
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SortType.LENGTH,
          })}
          onClick={() => {
            setSortField(SortType.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          key={SortType.REVERSE}
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => {
            setReversed(!reversed);
          }}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            key={SortType.RESET}
            type="button"
            className={classNames('button', 'is-danger', 'is-light')}
            onClick={() => {
              setSortField(SortType.RESET);
              setReversed(false);
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
