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

enum SortType {
  NAME,
  LENGTH,
  RESET,
}

export const App: React.FC = () => {

  const [sortField, setSortField] = useState(SortType.RESET);
  const [reverse, setReverse] = useState(false);

  const getVisibleGoods = () => {
    const result = [...goodsFromServer];

    if (sortField === SortType.LENGTH) {
      result.sort((good1, good2) => good1.length - good2.length);
    }

    if (sortField === SortType.NAME) {
      result.sort((good1, good2) => good1.localeCompare(good2));
    }

    if (reverse) {
      result.reverse();
    }

    return result;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.NAME ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.LENGTH)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`button is-warning ${reverse ? '' : 'is-light'}`}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>
        {(sortField !== SortType.RESET || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.RESET);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {getVisibleGoods().map((element: string) => (
            <li key={element} data-cy="Good">
              {element}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
