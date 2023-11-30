import React, { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

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

enum SortType {
  None,
  Name,
  Length,
}

interface PrepArgs {
  sortField: SortType;
  reverseStatus: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortField, reverseStatus }: PrepArgs,
) {
  const preparedGoods = [...goods];

  if (sortField !== SortType.None) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Length:
          return good1.length - good2.length;

        case SortType.Name:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (reverseStatus) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.None);
  const [reverseStatus, setReverseStatus] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortField, reverseStatus },
  );
  const isGoodsChanged = (sortField !== SortType.None || reverseStatus);

  const reset = () => {
    setSortField(SortType.None);
    setReverseStatus(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== SortType.Name },
          )}
          onClick={() => setSortField(SortType.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== SortType.Length },
          )}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !reverseStatus },
          )}
          onClick={() => setReverseStatus(!reverseStatus)}
        >
          Reverse
        </button>

        {isGoodsChanged && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
