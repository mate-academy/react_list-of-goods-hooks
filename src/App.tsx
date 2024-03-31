import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './GoodList';

interface FilterParams {
  sortField: keyof (string | number);
  reverseField: string;
}

const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';

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

function getPreperedGoods(
  goods: string[],
  { sortField, reverseField }: FilterParams,
) {
  const preparedGoods = [...goods];

  if (typeof sortField !== 'undefined') {
    preparedGoods.sort((good1, good2) => {
      const value1 = good1[sortField];
      const value2 = good2[sortField];

      if (typeof value1 === 'number' && typeof value2 === 'number') {
        return value1 - value2;
      }

      if (typeof value1 === 'string' && typeof value2 === 'string') {
        return value1.localeCompare(value2);
      }

      return 0;
    });
  }

  if (reverseField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [reverseField, setReverseField] = useState(false);
  const [sortField, setSortField] = useState('');
  const visibleGoods = getPreperedGoods(
    goodsFromServer,
    {
      sortField,
      reverseField,
    }
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
          type="button"
          className="button is-info is-light"
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className="button is-success is-light"
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverseField(!reverseField)}
          type="button"
          className="button is-warning is-light"
        >
          Reverse
        </button>

        <button
          onClick={() => {
            setSortField('');
            setReverseField(false);
          }}
          type="button"
          className="button is-danger is-light"
        >
          Reset
        </button>
      </div>

      <ul>
        <GoodList goods={visibleGoods} />
      </ul>
    </div>
  );
};
