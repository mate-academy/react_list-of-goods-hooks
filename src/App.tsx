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
  Default = '',
  Alphabet = 'alphabet',
  Length = 'length',
}

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
        case SortType.Alphabet:
          return good1.localeCompare(good2);
        case SortType.Length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  return order ? prepearedGoods.reverse() : prepearedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [order, setOrder] = useState(false);

  const visibleGoods = getPrepearedGoods(goodsFromServer, { sortField, order });

  const handleSort = (field: SortType) => {
    if (field === sortField) {
      setOrder(!order);
    } else {
      setOrder(false);
      setSortField(field);
    }
  };

  const handleReset = () => {
    setSortField(SortType.Default);
    setOrder(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            handleSort(SortType.Alphabet);
          }}
          type="button"
          className={
            sortField === SortType.Alphabet
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            handleSort(SortType.Length);
          }}
          type="button"
          className={
            sortField === SortType.Length
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

        {(sortField !== SortType.Default || order) && (
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
