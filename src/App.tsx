import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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

const SORT_FIELD_ALPHABETICALLY = 'Sort alphabetically';
const SORT_FIELD_LENGTH = 'Sort by length';
const SORT_FIELD_RESET = '';

interface FilterParams {
  sortField: string;
  reverse: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortField, reverse }: FilterParams,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(SORT_FIELD_RESET);
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SORT_FIELD_ALPHABETICALLY
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => {
            setSortField(SORT_FIELD_ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SORT_FIELD_LENGTH
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => {
            setSortField(SORT_FIELD_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            reverse ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={() => {
            setReverse(!reverse);
          }}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReverse(false);
              setSortField(SORT_FIELD_RESET);
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
