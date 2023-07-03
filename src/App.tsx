import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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

enum SortTypes {
  SORT_FIELD_ALPHABETICALLY = 'alphabetically',
  SORT_FIELD_BY_LENGTH = 'length',
  SORT_REVERSE = 'reverse',
  DEFAULT = '',
}

interface ISortButton {
  name: string;
  type: SortTypes;
  style: string;
}

const sortButtons: ISortButton[] = [
  {
    name: 'Sort alphabetically',
    type: SortTypes.SORT_FIELD_ALPHABETICALLY,
    style: 'is-info',
  },
  {
    name: 'Sort by length',
    type: SortTypes.SORT_FIELD_BY_LENGTH,
    style: 'is-success',
  },
  {
    name: 'Reverse',
    type: SortTypes.SORT_REVERSE,
    style: 'is-warning',
  },
];

function getPreparedGoods(
  goods: string[],
  sortField: SortTypes,
  isReversed: boolean,
) {
  const preparedGoods = [...goods];

  if (sortField === SortTypes.SORT_FIELD_ALPHABETICALLY) {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortField === SortTypes.SORT_FIELD_BY_LENGTH) {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField]
    = useState<SortTypes>(SortTypes.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer, sortField, isReversed,
  );

  const handleSort = (type: SortTypes) => {
    if (type === SortTypes.SORT_REVERSE) {
      setIsReversed(!isReversed);
    } else {
      setSortField(type);
    }
  };

  const handleReset = () => {
    setSortField(SortTypes.DEFAULT);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        {sortButtons.map(({ name, type, style }) => (
          <button
            key={type}
            type="button"
            className={cn('button', style, {
              'is-light': type === SortTypes.SORT_REVERSE
                ? !isReversed
                : type !== sortField,
            })}
            onClick={() => handleSort(type)}
          >
            {name}
          </button>
        ))}

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
