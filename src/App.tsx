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
  Alphabet = 'alphabet',
  Length = 'length',
}

interface SortField {
  field: SortType | '';
  isReverse: boolean;
}

function getSortedGoods(goods: string[], sortField: SortField): string[] {
  const preparedGoods = [...goods];
  const { field, isReverse } = sortField;

  preparedGoods.sort((good1, good2) => {
    if (field === SortType.Alphabet) {
      return good1.localeCompare(good2);
    }

    if (field === SortType.Length) {
      return good1.length - good2.length;
    }

    return 0;
  });

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

const initialState: SortField = { field: '', isReverse: false };

const App: React.FC = () => {
  const [sortField, setSortField] = useState(initialState);
  const visibleGoods = getSortedGoods(goodsFromServer, sortField);
  const isShowReset = !!sortField.field || sortField.isReverse;

  const handleReverse = () => {
    if (sortField.isReverse) {
      setSortField({ ...sortField, isReverse: false });

      return;
    }

    setSortField({ ...sortField, isReverse: true });
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField.field !== SortType.Alphabet,
          })}
          onClick={() => setSortField(
            { ...sortField, field: SortType.Alphabet },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField.field !== SortType.Length,
          })}
          onClick={() => {
            setSortField({ ...sortField, field: SortType.Length });
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !sortField.isReverse,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isShowReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setSortField(initialState)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
