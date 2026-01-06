import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  None = 'none',
  Alphabet = 'alphabet',
  Length = 'length',
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

  if (sortField !== SortType.None) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case SortType.Alphabet:
          return a.localeCompare(b);

        case SortType.Length:
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
  const [sortField, setSortField] = useState<SortType>(SortType.None);
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
            sortField === SortType.Alphabet ? 'is-info' : 'is-light'
          }`}
          onClick={() => setSortField(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button ${
            sortField === SortType.Length ? 'is-success' : 'is-light'
          }`}
          onClick={() => setSortField(SortType.Length)}
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

        {(sortField !== SortType.None || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.None);
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
