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
  None,
  Name,
  Length,
}

type Goods = typeof goodsFromServer;

type PreparationOptions = {
  sortBy: SortType,
  reverseGoods: boolean,
};

const getPreparedGoods = (
  goods: Goods,
  { sortBy, reverseGoods }: PreparationOptions,
) => {
  let prepared = [...goods];

  if (sortBy) {
    prepared = prepared.sort((g1, g2) => {
      switch (sortBy) {
        case SortType.Length:
          return g1.length - g2.length;
        case SortType.Name:
          return g1.localeCompare(g2);
        default:
          return 0;
      }
    });
  }

  if (reverseGoods) {
    prepared.reverse();
  }

  return prepared;
};

export const App: React.FC = () => {
  const [reverseGoods, setReverseGoods] = useState(false);
  const [sortBy, setSortBy] = useState(SortType.None);
  const goods = getPreparedGoods(goodsFromServer, { sortBy, reverseGoods });

  const handleSortBy = (field: SortType) => {
    setSortBy(field);
  };

  const reset = () => {
    setSortBy(SortType.None);
    setReverseGoods(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy !== SortType.Name && 'is-light'}`}
          onClick={() => handleSortBy(SortType.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy !== SortType.Length && 'is-light'}`}
          onClick={() => handleSortBy(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!reverseGoods && 'is-light'}`}
          onClick={() => setReverseGoods(!reverseGoods)}
        >
          Reverse
        </button>

        {(sortBy || reverseGoods)
        && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
