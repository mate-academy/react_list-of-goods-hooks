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

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [reverseField, setRevField] = useState<boolean>(false);
  const visibleGoods: string[] = [...goodsFromServer];

  if (sortField) {
    visibleGoods.sort((good1, good2) => {
      switch (sortField) {
        case 'length':
          return good1.length - good2.length;

        case 'alphabet':
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
          onClick={() => (setSortField('alphabet'))}
          className={`button is-info ${sortField !== 'alphabet' && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => (setSortField('length'))}
          className={`button is-success ${sortField !== 'length' && 'is-light'}`}
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
