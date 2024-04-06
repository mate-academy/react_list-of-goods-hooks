import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import React, { useState } from 'react';

type infoFromServer = string[];

export const goodsFromServer: infoFromServer = [
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
  SORT_ALPHABETICALY = 'alphabeticaly',
  SORT_BY_LENGTH = 'length',
}

function getPreparedList(
  list: infoFromServer,
  sortField: string,
  reverseState: boolean,
) {
  let preparedList = [...list];

  if (!sortField && !reverseState) {
    return list;
  }

  if (!sortField && reverseState) {
    return preparedList.reverse();
  }

  if (sortField) {
    preparedList = preparedList.sort((good1, good2) => {
      switch (sortField) {
        default:
          return 0;
        case SortType.SORT_ALPHABETICALY:
          return good1.localeCompare(good2);
        case SortType.SORT_BY_LENGTH:
          return good1.length - good2.length;
      }
    });
  }

  if (reverseState) {
    preparedList = preparedList.reverse();
  }

  return preparedList;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseState, setReverseState] = useState(false);
  const visibleGoods = getPreparedList(
    goodsFromServer,
    sortField,
    reverseState,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.SORT_ALPHABETICALY,
          })}
          onClick={() => {
            setSortField(SortType.SORT_ALPHABETICALY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.SORT_BY_LENGTH,
          })}
          onClick={() => {
            setSortField(SortType.SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reverseState === false,
          })}
          onClick={() => {
            setReverseState(!reverseState);
          }}
        >
          Reverse
        </button>

        {(sortField || reverseState) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReverseState(false);
            }}
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
