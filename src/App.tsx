import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortBy {
  ALPHABETICALLY = 'alphabetically',
  LENGTH = 'length',
  DEFAULT = 'default',
}

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

function getPreparedFoods(
  goods: string[],
  sortField: SortBy,
  isReversed: boolean,
) {
  const preparedGoods = [...goods];

  if (sortField === SortBy.ALPHABETICALLY) {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortField === SortBy.LENGTH) {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<SortBy>(SortBy.DEFAULT);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const visibleGoods = getPreparedFoods(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info${sortField === SortBy.ALPHABETICALLY ? '' : ' is-light'}`}
          onClick={() => setSortField(SortBy.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success${sortField === SortBy.LENGTH ? '' : ' is-light'}`}
          onClick={() => setSortField(SortBy.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning${isReversed ? '' : ' is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {sortField === SortBy.DEFAULT && isReversed === false ? (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <></>
        ) : (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortBy.DEFAULT);
              setIsReversed(false);
            }}
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
