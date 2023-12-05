import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
  default = 0,
  alphabet = 1,
  length = 2,
}

interface FilterParams {
  sortField: SortType;
  isReverseField: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortField, isReverseField }: FilterParams,
) {
  let preparedgoods = [...goods];

  if (sortField > 0) {
    preparedgoods.sort((good1, good2) => {
      switch (sortField) {
        case 1:
          return good1.localeCompare(good2);

        case 2:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverseField) {
    preparedgoods = preparedgoods.reverse();
  }

  return preparedgoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(0);
  const [isReverseField, setIsReverseField] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer,
    { sortField, isReverseField });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(1)}
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortField !== 1 },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(2)}
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortField !== 2 },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => (
            setIsReverseField(!isReverseField)
          )}
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReverseField },
          )}
        >
          Reverse
        </button>
        {(!!sortField || isReverseField)
        && (
          <button
            onClick={() => {
              setSortField(0);
              setIsReverseField(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={`${good}`}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
