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

enum SortType {
  sort_field_length = 'length',
  sort_field_alphabeticaly = 'alphabetically',
  sort_field_default = '',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
) {
  let preperedGoods = [...goods];

  preperedGoods = preperedGoods
    .sort((good1, good2) => {
      switch (sortField) {
        case SortType.sort_field_alphabeticaly:
          return good1.localeCompare(good2);
        case SortType.sort_field_length:
          return good1[sortField] - good2[sortField];
        default: return 0;
      }
    });

  if (isReversed) {
    preperedGoods = preperedGoods.reverse();
  }

  return preperedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.sort_field_default);
  const [isReversed, setIsReversed] = useState(false);
  const visibileGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    isReversed,
  );

  const reset = () => {
    setIsReversed(false);
    setSortField(SortType.sort_field_default);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.sort_field_alphabeticaly,
          })}
          onClick={() => setSortField(SortType.sort_field_alphabeticaly)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.sort_field_length,
          })}
          onClick={() => setSortField(SortType.sort_field_length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
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
        <ul>
          {visibileGoods.map((good) => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
