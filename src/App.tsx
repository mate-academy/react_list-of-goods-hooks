import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { SortType } from './index';

export const goodsFromServer: string[] = [
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
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [reversed, setReversed] = useState(false);
  const visibleGoods = [...goodsFromServer];
  const NOT_ACTIVE_CLASS = 'is-light';

  switch (sortType) {
    case SortType.Alphabetical:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SortType.Length:
      visibleGoods.sort((a, b) => a.length - b.length);
      break;

    case SortType.Default:
    default:
      break;
  }

  if (reversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.Alphabetical ? '' : NOT_ACTIVE_CLASS}`}
          onClick={() => setSortType(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.Length ? '' : NOT_ACTIVE_CLASS}`}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : NOT_ACTIVE_CLASS}`}
          onClick={() => setReversed(prev => !prev)}
        >
          Reverse
        </button>

        {sortType !== SortType.Default || reversed ? (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortType(SortType.Default);
              setReversed(false);
            }}
          >
            Reset
          </button>
        ) : null}
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
