import React, { useState } from 'react';
import cn from 'classnames';
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
  SORT_FIELD_ALPHABETICALLY = 'alphabetically',
  SORT_FIELD_LENGTH = 'length',
  NONE = 'none',
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.NONE);
  const [reversed, setReversed] = useState<boolean>(false);

  const handleAlphabetically = () => {
    setSortField(SortType.SORT_FIELD_ALPHABETICALLY);
  };

  const handleLength = () => {
    setSortField(SortType.SORT_FIELD_LENGTH);
  };

  const handleReverse = () => {
    setReversed(!reversed);
  };

  const handleReset = () => {
    setReversed(false);
    setSortField(SortType.NONE);
  };

  let visibleGoods = [...goodsFromServer];

  if (sortField === SortType.SORT_FIELD_ALPHABETICALLY) {
    visibleGoods = visibleGoods.sort();
  }

  if (sortField === SortType.SORT_FIELD_LENGTH) {
    visibleGoods = visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (reversed) {
    visibleGoods = visibleGoods.reverse();
  }

  const isInitialOrder = sortField === SortType.NONE && !reversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleAlphabetically}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.SORT_FIELD_ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleLength}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={cn('button is-warning', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>
        {!isInitialOrder && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
