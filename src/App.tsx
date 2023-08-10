import React, { useState } from 'react';
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

type SortType = 'length' | 'alphabet';

const SORT_FIELD_LENGTH: SortType = 'length';
const SORT_FIELD_ALPHABET: SortType = 'alphabet';

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [reverseField, setRevField] = useState<boolean>(false);
  const visibleGoods: string[] = [...goodsFromServer];

  if (sortField) {
    visibleGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        case SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => (setSortField(SORT_FIELD_ALPHABET))}
          className={`button is-info ${sortField !== SORT_FIELD_ALPHABET && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => (setSortField(SORT_FIELD_LENGTH))}
          className={`button is-success ${sortField !== SORT_FIELD_LENGTH && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverseField === false && 'is-light'}`}
          onClick={() => (setRevField(!reverseField))}
        >
          Reverse
        </button>

        {(reverseField !== false || sortField !== '') && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setRevField(false);
            }}
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
