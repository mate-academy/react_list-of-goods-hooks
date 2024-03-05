import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

export interface Good {
  id: number;
  name: string;
}

export const goodsFromServer: Good[] = [
  { id: 1, name: 'Dumplings' },
  { id: 2, name: 'Carrot' },
  { id: 3, name: 'Eggs' },
  { id: 4, name: 'Ice cream' },
  { id: 5, name: 'Apple' },
  { id: 6, name: 'Bread' },
  { id: 7, name: 'Fish' },
  { id: 8, name: 'Honey' },
  { id: 9, name: 'Jam' },
  { id: 10, name: 'Garlic' },
];

const SORT_FIELD_ALPHABET = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';

const getPreparedGoods = (
  goods: Good[],
  { sortField, reverse }: { sortField: string; reverse: boolean },
): Good[] => {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      const name1 = good1.name.toLowerCase();
      const name2 = good2.name.toLowerCase();

      let comparisonResult = 0;
      let lengthDiff;

      switch (sortField) {
        case SORT_FIELD_ALPHABET:
          comparisonResult = name1.localeCompare(name2);
          break;

        case SORT_FIELD_LENGTH:
          lengthDiff = name1.length - name2.length;

          if (lengthDiff !== 0) {
            comparisonResult = lengthDiff;
          } else {
            comparisonResult = name1.localeCompare(name2);
          }

          break;

        default:
          return comparisonResult;
      }

      return comparisonResult;
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);

  const handleSort = (field: string) => {
    const newReverse = field === sortField ? !reverse : reverse; // Keep the current reverse state if the same field is clicked

    setSortField(field);
    setReverse(newReverse);
  };

  const handleReverse = () => {
    if (!sortField && !reverse) {
      setReverse(true);
    } else {
      setReverse(!reverse);
    }
  };

  const handleReset = () => {
    setSortField('');
    setReverse(false);
  };

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light':
              sortField !== SORT_FIELD_ALPHABET ||
              (reverse && sortField !== SORT_FIELD_ALPHABET),
          })}
          onClick={() => handleSort(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn('button is-success', {
            'is-light':
              sortField !== SORT_FIELD_LENGTH ||
              (reverse && sortField !== SORT_FIELD_LENGTH),
          })}
          onClick={() => handleSort(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !reverse })}
          onClick={handleReverse}
        >
          Reverse
        </button>
        {(sortField || reverse) && (
          <button
            type="button"
            className={cn('button is-danger', 'is-light')}
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {visibleGoods.map(good => (
          <li key={good.id} data-cy="Good">
            {good.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
