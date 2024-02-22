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

const enum SortType {
  SORT_ALPHABETICALLY = 'alphabetically',
  SORT_BY_LENGTH = 'length',
  default = '',
}

interface PreparedGoodsParams {
  sortBy: string;
  isReversed: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortBy, isReversed }: PreparedGoodsParams,
) {
  const preparedGoods = [...goods];

  if (sortBy) {
    preparedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SortType.SORT_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SortType.SORT_BY_LENGTH:
          return good1[sortBy] - good2[sortBy];

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
  const [sortBy, setSortBy] = useState(SortType.default);
  const [isReversed, setIsReversed] = useState(false);
  const goods = getPreparedGoods(goodsFromServer, { sortBy, isReversed });

  const handleReset = () => {
    setSortBy(SortType.default);
    setIsReversed(false);
  };

  const isSortTypeChecked = (sortType: string) => sortBy === sortType;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortBy(SortType.SORT_ALPHABETICALLY)}
          type="button"
          className={`button is-info ${!isSortTypeChecked(SortType.SORT_ALPHABETICALLY) && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortBy(SortType.SORT_BY_LENGTH)}
          type="button"
          className={`button is-success ${!isSortTypeChecked(SortType.SORT_BY_LENGTH) && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={`button is-warning ${!isReversed && 'is-light'}`}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
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
