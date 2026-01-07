import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  none = '',
  alphabet = 'alphabet',
  length = 'length',
}

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

type GoodsListProps = {
  goods: string[];
};

function GoodsList({ goods }: GoodsListProps) {
  return (
    <ul>
      {goods.map(good => (
        <li data-cy="Good" key={good}>
          {good}
        </li>
      ))}
    </ul>
  );
}

function getPreparedGoods(
  goods: string[],
  {
    sortField,
    isReversed,
  }: {
    sortField: SortType;
    isReversed: boolean;
  },
): string[] {
  const preparedGoods = [...goods];

  if (sortField !== SortType.none) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case SortType.alphabet:
          return a.localeCompare(b);

        case SortType.length:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.none);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button ${
            sortField === SortType.alphabet ? 'is-info' : 'is-light'
          }`}
          onClick={() => setSortField(SortType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button ${
            sortField === SortType.length ? 'is-success' : 'is-light'
          }`}
          onClick={() => setSortField(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button ${isReversed ? 'is-warning' : 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortField !== SortType.none || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.none);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={visibleGoods} />
    </div>
  );
};
