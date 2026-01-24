import React, { useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { SortType } from './types/SortType';

const goodsFromServer = [
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
  const [sortField, setSortField] = useState(SortType.None);
  const [reversed, setReversed] = useState(false);

  const visibleList = useMemo(() => {
    const result = [...goodsFromServer];

    result.sort((a, b) => {
      switch (sortField) {
        case SortType.Alphabetically:
          return a.localeCompare(b);
        case SortType.Length:
          return a.length - b.length;
        default:
          return 0;
      }
    });

    if (reversed) {
      result.reverse();
    }

    return result;
  }, [sortField, reversed]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SortType.Alphabetically
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => {
            setSortField(SortType.Alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SortType.Length
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => {
            setSortField(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            reversed ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={() => {
            setReversed(!reversed);
          }}
        >
          Reverse
        </button>

        {(sortField !== SortType.None || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReversed(false);
              setSortField(SortType.None);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleList.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
