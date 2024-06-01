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
  SORT_ALPHABETICALLY = 'alphabet',
  SORT_BY_LENGTH = 'length',
  EMPTY = '',
}

function getPreparedGoods(
  goods: string[],
  sortGoods: SortType,
  reversed: boolean,
) {
  const preparedGoods = [...goods];

  if (sortGoods) {
    preparedGoods.sort((good1, good2) => {
      switch (sortGoods) {
        case SortType.SORT_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SortType.SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortGoods, setSortGoods] = useState<SortType>(SortType.EMPTY);
  const [reversed, setReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortGoods, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortGoods === SortType.SORT_ALPHABETICALLY ? '' : 'is-light'}`}
          onClick={(): void => setSortGoods(SortType.SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortGoods === SortType.SORT_BY_LENGTH ? '' : 'is-light'}`}
          onClick={(): void => setSortGoods(SortType.SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={(): void => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortGoods || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={(): void => {
              setSortGoods(SortType.EMPTY);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
