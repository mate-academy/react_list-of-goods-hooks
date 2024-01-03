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

interface SortParams {
  sortField: string;
  reversedField: true | false;
}

enum SortField {
  alphabet = 'alphabet',
  length = 'length',
}

function getPreparedGoods(
  goods: string[],
  { sortField, reversedField }: SortParams,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortField.alphabet:
          return good1.localeCompare(good2);

        case SortField.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversedField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [reversedField, setReversedField] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortField, reversedField },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-success${sortField === SortField.alphabet ? '' : ' is-light'}`}
          onClick={() => setSortField(SortField.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success${sortField === SortField.length ? '' : ' is-light'}`}
          onClick={() => setSortField(SortField.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning${reversedField ? '' : ' is-light'}`}
          onClick={() => setReversedField(!reversedField)}
        >
          Reverse
        </button>

        {
          (sortField || reversedField) && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortField('');
                setReversedField(false);
              }}
            >
              Reset
            </button>
          )
        }

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
