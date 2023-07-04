import React, { useState } from 'react';
import cn from 'classnames';

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

enum SortBy {
  default,
  length,
  asc,
}

function getPrepareGoods(
  goods: string[],
  sortField: SortBy,
  reverseField: boolean,
): string[] {
  const prepareGoods = [...goods];

  switch (sortField) {
    case SortBy.asc:
      prepareGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SortBy.length:
      prepareGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      return prepareGoods;
  }

  if (reverseField) {
    prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortBy>(
    SortBy.default,
  );
  const [reverseField, setReverseField] = useState<boolean>(false);

  const visibleGoods = getPrepareGoods(
    goodsFromServer,
    sortField,
    reverseField,
  );

  function reverseWithConditions() {
    setReverseField(!reverseField);
  }

  function reset() {
    setSortField(SortBy.default);
    setReverseField(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== SortBy.asc },
          )}
          onClick={() => setSortField(SortBy.asc)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== SortBy.length },
          )}
          onClick={() => setSortField(SortBy.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !reverseField },
          )}
          onClick={reverseWithConditions}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
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
          <li data-cy="Good" key={`#id-${good}`}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
