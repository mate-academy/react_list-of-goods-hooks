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

enum SortType {
  DEFAULT,
  ALPHABET,
  LENGTH,
}

function getPreparedGoods(
  goods: string[],
  sortBy: SortType,
  reverse: boolean,
): string[] {
  const preparedGoods = [...goods];

  if (sortBy !== SortType.DEFAULT) {
    preparedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SortType.ALPHABET:
          return good1.localeCompare(good2);
        case SortType.LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(SortType.DEFAULT);
  const [reversed, setReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, reversed);
  const showReversedBtn = sortField !== SortType.DEFAULT || reversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SortType.ALPHABET ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortField(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => setReversed(prev => !prev)}
        >
          Reverse
        </button>
        {showReversedBtn && (
          <button
            type="button"
            className={`button is-danger is-light`}
            onClick={() => {
              setSortField(SortType.DEFAULT);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(item => {
          return (
            <li data-cy="Good" key={item}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
