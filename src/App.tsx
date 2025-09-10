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

enum SortType {
  Deafault = '',
  Alphabet = 'alphabet',
  Length = 'length',
}

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

interface FilterParams {
  sortField: SortType;
  order: boolean;
}

function getPrepearedGoods(
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
  const [sortField, setSortField] = useState<SortType>(SortType.Deafault);
  const [order, setOrder] = useState(false);

  const visibleGoods = getPrepearedGoods(goodsFromServer, { sortField, order });

  const handleClearSort = (field: SortType) => {
    if (field === sortField) {
      setOrder(!order);
    } else {
      setOrder(false);
      setSortField(field);
    }
  };

  const handleReset = () => setSortField(SortType.Deafault);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            handleClearSort(SortType.Alphabet);
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
            handleClearSort(SortType.Length);
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
          className={order ? 'button is-warning' : 'button is-light'}
        >
          Reverse
        </button>

        {(sortField !== SortType.Deafault || order) && (
          <button
            onClick={() => {
              handleReset();
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li className="item" key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
