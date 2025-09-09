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

type SortField = 'alphabet' | 'length' | 'reverse' | '';

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

interface FilterParams {
  sortField: SortField;
  order: boolean;
}

function getPrepearedGods(
  goods: string[],
  { sortField, order }: FilterParams,
): string[] {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  return order ? prepearedGoods.reverse() : prepearedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>('');
  const [order, setOrder] = useState(false);

  const visibleGoods = getPrepearedGods(goodsFromServer, { sortField, order });

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setOrder(!order);
    } else {
      setOrder(false);
      setSortField(field);
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            handleSort(SORT_FIELD_ALPHABET);
          }}
          type="button"
          className={
            sortField === SORT_FIELD_ALPHABET
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            handleSort(SORT_FIELD_LENGTH);
          }}
          type="button"
          className={
            sortField === SORT_FIELD_LENGTH
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => setOrder(!order)}
          type="button"
          className="button is-warning is-light"
        >
          Reverse
        </button>

        <button
          onClick={() => {
            handleSort('');
          }}
          style={{ display: sortField === '' ? 'none' : 'inline-block' }}
          type="button"
          className="button is-danger is-light"
        >
          Reset
        </button>
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li className="item" key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
