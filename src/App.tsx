import React, { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

type Good = string;

export const goodsFromServer: Good[] = [
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
  ALPHABETICAL = 'alphabetical',
  LENGTH = 'length',
  DEFAULT = 'default',
}

interface FilterParams {
  sortType: SortType;
  reversed: boolean;
}

const getPreparedGoods = (
  goods: Good[],
  { sortType, reversed }: FilterParams,
): Good[] => {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.ALPHABETICAL:
          return good1.localeCompare(good2);

        case SortType.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [reversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.DEFAULT);

  const handleSortAlphabetically = () => setSortType(SortType.ALPHABETICAL);
  const handleSortByLength = () => setSortType(SortType.LENGTH);
  const handleReverse = () => setReversed(!reversed);
  const handleReset = () => {
    setSortType(SortType.DEFAULT);
    setReversed(false);
  };

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortType,
    reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.ALPHABETICAL,
          })}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.DEFAULT || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
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
