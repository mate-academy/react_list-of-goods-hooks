import { useState } from 'react';
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

enum SortField {
  ALPHABETICALLY = 'alphabetically',
  LENGTH = 'length',
  NONE = '', // Explicit initial state for sortField
}

interface GoodsProps {
  sortField: SortField;
  reversed: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortField, reversed }: GoodsProps,
): string[] {
  const preparedGoods = [...goods];

  if (sortField !== SortField.NONE) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortField.ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SortField.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<SortField>(SortField.NONE);
  const [reversed, setReversed] = useState<boolean>(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    {
      sortField,
      reversed,
    },
  );

  const handleSortFieldChange = (field: SortField) => {
    setSortField(prevSortField => (
      prevSortField === field ? SortField.NONE : field
    ));
  };

  const handleReversedChange = () => {
    setReversed(prevReversed => !prevReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== SortField.ALPHABETICALLY },
          )}
          onClick={() => handleSortFieldChange(SortField.ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== SortField.LENGTH },
          )}
          onClick={() => handleSortFieldChange(SortField.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !reversed },
          )}
          onClick={handleReversedChange}
        >
          Reverse
        </button>

        {(sortField !== SortField.NONE || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReversed(false);
              setSortField(SortField.NONE);
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
