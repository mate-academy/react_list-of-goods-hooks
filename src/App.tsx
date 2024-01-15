import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

const SORT_FIELD_ABC = 'alphabetical';
const SORT_FIELD_LGTH = 'length';

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

function sortingGoods(
  goods:string[], sortField:string, isReversed:boolean,
):string[] {
  const copyGoods = [...goods];

  copyGoods.sort((good1, good2) => {
    switch (sortField) {
      case SORT_FIELD_ABC:
        return good1.localeCompare(good2);
      case SORT_FIELD_LGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    copyGoods.reverse();
  }

  return copyGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setReversed] = useState(false);
  const visibleGoods = sortingGoods(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SORT_FIELD_ABC);
          }}
          type="button"
          className={`button is-info ${sortField !== SORT_FIELD_ABC && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SORT_FIELD_LGTH);
          }}
          type="button"
          className={`button is-success ${sortField !== SORT_FIELD_LGTH && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!isReversed)}
          type="button"
          className={`button is-warning ${!isReversed && 'is-light'}`}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {
          visibleGoods.map(good => (
            <li key={good} data-cy="Good">{good}</li>
          ))
        }
      </ul>
    </div>
  );
};
