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
  Alphabetically = 'Alphabetically',
  Length = 'Length',
}

interface SortBy {
  reverseOrder: boolean;
  sortField: SortType | '';
}

interface Goods {
  goods: string[];
}

function getPreparedGoods(
  goods: Goods['goods'],
  { sortField, reverseOrder }: SortBy,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Alphabetically:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseOrder) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [reverseOrder, setReverseOrder] = useState(false);

  const goods = getPreparedGoods(goodsFromServer, { sortField, reverseOrder });
  const isGoods = goodsFromServer.every((good, i) => good === goods[i]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SortType.Alphabetically);
          }}
          type="button"
          className={`button is-info ${sortField === SortType.Alphabetically ? null : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SortType.Length);
          }}
          type="button"
          className={`button is-success ${sortField === SortType.Length ? null : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setReverseOrder(!reverseOrder);
          }}
          type="button"
          className={`button is-warning ${reverseOrder ? null : 'is-light'}`}
        >
          Reverse
        </button>
        {!isGoods ? (
          <button
            onClick={() => {
              setSortField('');
              setReverseOrder(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
