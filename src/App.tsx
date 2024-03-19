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

enum SortType {
  SORT_FIELD_BY_NAME = 'name',
  SORT_FIELD_BY_LENGTH = 'length',
  SORT_BY_NONE = '',
}

interface Goods {
  sortField: SortType;
  IsReversed: boolean;
}

function getPreparedGoods(goods: string[], { sortField, IsReversed }: Goods) {
  const copyGoods = [...goods];

  if (sortField) {
    copyGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SORT_FIELD_BY_NAME:
          return good1.localeCompare(good2);

        case SortType.SORT_FIELD_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (IsReversed) {
    return copyGoods.reverse();
  }

  return copyGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.SORT_BY_NONE);
  const [IsReversed, SetISReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    IsReversed,
  });

  const handleReset = () => {
    setSortField(SortType.SORT_BY_NONE);
    SetISReversed(false);
  };

  const handleReversed = () => {
    SetISReversed(!IsReversed);
  };

  const buttonClassesByName = cn('button', 'is-info', {
    'is-light': sortField !== SortType.SORT_FIELD_BY_NAME,
  });

  const buttonClassesByLength = cn('button', 'is-info', {
    'is-light': sortField !== SortType.SORT_FIELD_BY_LENGTH,
  });
  const buttonClassesByREversed = cn('button', 'is-warning', {
    'is-light': !IsReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={buttonClassesByName}
          onClick={() => setSortField(SortType.SORT_FIELD_BY_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={buttonClassesByLength}
          onClick={() => setSortField(SortType.SORT_FIELD_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={buttonClassesByREversed}
          onClick={handleReversed}
        >
          Reverse
        </button>

        {(sortField || IsReversed) && (
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
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
