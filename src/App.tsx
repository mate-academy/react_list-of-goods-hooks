import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import { SortType } from './types/SortType';
import { SortParams } from './types/SortParams';
import { Good } from './types/Good';

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
];

export const App: React.FC = () => {
  const [sortParams, setSortParams] = useState<SortParams>({
    sort: SortType.DEFAULT,
    reverse: false,
  });

  const visibleGoods = [...goodsFromServer];

  switch (sortParams.sort) {
    case SortType.ALPHABET:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.LENGTH:
      visibleGoods.sort((a, b) => a.length - b.length);
      break;
  }

  if (sortParams.reverse) {
    visibleGoods.reverse();
  }

  const hasChanges = sortParams.sort !== SortType.DEFAULT || sortParams.reverse;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortParams.sort === SortType.ALPHABET ? '' : 'is-light'}`}
          onClick={() =>
            setSortParams(prev => ({ ...prev, sort: SortType.ALPHABET }))
          }
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortParams.sort === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={() =>
            setSortParams(prev => ({ ...prev, sort: SortType.LENGTH }))
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${sortParams.reverse ? '' : 'is-light'}`}
          onClick={() =>
            setSortParams(prev => ({ ...prev, reverse: !prev.reverse }))
          }
        >
          Reverse
        </button>

        {hasChanges && (
          <button
            type="button"
            className="button is-danger"
            onClick={() =>
              setSortParams({ sort: SortType.DEFAULT, reverse: false })
            }
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
