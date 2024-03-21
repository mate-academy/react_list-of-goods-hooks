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
  SortAlphabetically = 'alphabetically',
  SortByLength = 'length',
  Default = '',
}

interface PreparedGoodsParams {
  sortBy: SortType;
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
        case SortType.SortAlphabetically:
          return good1.localeCompare(good2);

        case SortType.SortByLength:
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
  const [sortBy, setSortBy] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);
  const goods = getPreparedGoods(goodsFromServer, { sortBy, isReversed });

  const handleReset = () => {
    setSortBy(SortType.Default);
    setIsReversed(false);
  };

  const isSortTypeChecked = (sortType: SortType) => sortBy === sortType;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortBy(SortType.SortAlphabetically)}
          type="button"
          className={`button is-info ${!isSortTypeChecked(SortType.SortAlphabetically) && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortBy(SortType.SortByLength)}
          type="button"
          className={`button is-success ${!isSortTypeChecked(SortType.SortByLength) && 'is-light'}`}
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
