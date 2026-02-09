import 'bulma/css/bulma.css';
import './App.scss';

import { useState } from 'react';
import { SortType } from './types/SortType';
import { SortParams } from './types/SortParams';

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

export const App: React.FC = () => {
  const [sortParams, setSortParams] = useState<SortParams>({
    sort: SortType.Default,
    reverse: false,
  });

  const visibleGoods = [...goodsFromServer];

  if (sortParams.sort === SortType.Alphabet) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortParams.sort === SortType.Length) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (sortParams.reverse) {
    visibleGoods.reverse();
  }

  const isChanged = sortParams.sort !== SortType.Default || sortParams.reverse;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortParams.sort === SortType.Alphabet ? '' : 'is-light'}`}
          onClick={() =>
            setSortParams(prev => ({
              ...prev,
              sort: SortType.Alphabet,
            }))
          }
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortParams.sort === SortType.Length ? '' : 'is-light'}`}
          onClick={() =>
            setSortParams(prev => ({
              ...prev,
              sort: SortType.Length,
            }))
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${
            sortParams.reverse ? '' : 'is-light'
          }`}
          onClick={() =>
            setSortParams(prev => ({
              ...prev,
              reverse: !prev.reverse,
            }))
          }
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            className="button is-danger"
            onClick={() =>
              setSortParams({
                sort: SortType.Default,
                reverse: false,
              })
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
