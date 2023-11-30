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

enum SortBy {
  null = '',
  alphabet = 'alphabet',
  length = 'length',
}

type Goods = string[];

function getPreparedGoods(goods: Goods, sortBy: SortBy,
  reversed: boolean): Goods {
  let preparedGoods = [...goods];

  if (sortBy) {
    preparedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SortBy.alphabet:
          return good1.localeCompare(good2);

        case SortBy.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortBy.null);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortBy, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortBy(SortBy.alphabet)}
          className={sortBy === SortBy.alphabet
            ? 'button is-info'
            : 'button is-info is-light'}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortBy(SortBy.length)}
          className={sortBy === SortBy.length
            ? 'button is-info'
            : 'button is-info is-light'}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={isReversed
            ? 'button is-warning'
            : 'button is-warning is-light'}
          onClick={() => setIsReversed(prevIsReversed => !prevIsReversed)}
        >
          Reverse
        </button>

        {sortBy || isReversed
          ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortBy(SortBy.null);
                setIsReversed(false);
              }}
            >
              Reset
            </button>
          )
          : null}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={visibleGoods.indexOf(good)}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
