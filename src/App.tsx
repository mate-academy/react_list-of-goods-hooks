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
  NONE = '',
  SORT_ALPHABETICALLY = 'sort_alphabetically',
  SORT_LENGTH = 'sort_length',
}

function getPreparedGoods(goods: string[], sortParam: SortType | SortType.NONE, revers: boolean) {
  const prepearedGoods = [...goods];

  if (!sortParam) {
    return revers ? prepearedGoods.reverse() : prepearedGoods;
  }

  if (prepearedGoods) {
    prepearedGoods.sort((good1 , good2) => {

      if (sortParam === SortType.SORT_ALPHABETICALLY) {
        return good1.localeCompare(good2)
      }

      if (sortParam === SortType.SORT_LENGTH) {
        return good1.length - good2.length
      }

      return 0;
    })

    if (revers) {
      prepearedGoods.reverse();
    }
  }

  return prepearedGoods;
}



export const App: React.FC = () => {
  const [sortParam, setSortParam] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortParam, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortParam === SortType.SORT_ALPHABETICALLY ? '' : 'is-light'}`}
          onClick={() => {
            setSortParam(SortType.SORT_ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortParam === SortType.SORT_LENGTH ? '' : 'is-light'}`}
          onClick={() => {
            setSortParam(SortType.SORT_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${isReversed === true ? '' : 'is-light'}`}
          onClick={() =>
            isReversed ? setIsReversed(false) : setIsReversed(true)
          }
        >
          Reverse
        </button>

        {sortParam !== '' || isReversed ? (
          <button
            type="button"
            className="button is-info is-light"
            onClick={() => {
              setSortParam(SortType.NONE);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
