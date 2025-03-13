import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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

type SortStatus = {
  sortedGoods: SortType;
  reversed: boolean;
};

enum SortType {
  Alphabet,
  Length,
  Default,
}

function getSortedGoods(
  goods: string[],
  { sortedGoods, reversed }: SortStatus,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((a, b) => {
    switch (sortedGoods) {
      case SortType.Alphabet:
        return a.localeCompare(b);
      case SortType.Length:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (reversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortedGoods, setSortedGoods] = useState(SortType.Default);
  const [reversed, setReversed] = useState(false);

  const goods = getSortedGoods(goodsFromServer, { sortedGoods, reversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortedGoods === SortType.Alphabet ? '' : 'is-light'}`}
          onClick={() => setSortedGoods(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortedGoods === SortType.Length ? '' : 'is-light'}`}
          onClick={() => setSortedGoods(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-success ${reversed ? '' : 'is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortedGoods !== SortType.Default || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortedGoods(SortType.Default);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
