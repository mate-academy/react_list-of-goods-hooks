import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { SortParams } from './types/SortParams';
import { SortType } from './types/SortType';

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

function getPreparedGoods(goods: string[], sortParams: SortParams): string[] {
  let preparedGoods = [...goods];

  if (sortParams) {
    if (sortParams.sort === SortType.Alphabet) {
      preparedGoods = preparedGoods.sort(
        (good1, good2) => good1.localeCompare(good2),
        // eslint-disable-next-line function-paren-newline
      );
    } else if (sortParams.sort === SortType.Length) {
      preparedGoods = preparedGoods.sort(
        (good1, good2) => good1.length - good2.length,
      );
    }

    if (sortParams.reverse === true) {
      preparedGoods.reverse();
    }
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortParams, setSortParams] = useState<SortParams>({
    sort: SortType.Default,
    reverse: false,
  });
  const visibleGoods = getPreparedGoods(goodsFromServer, sortParams);

  const handleSortAlphabetically = () => {
    setSortParams(p => ({ ...p, sort: SortType.Alphabet }));
  };

  const handleSortByLength = () => {
    setSortParams(p => ({ ...p, sort: SortType.Length }));
  };

  const handleToggleReverse = () => {
    setSortParams(p => ({ ...p, reverse: !p.reverse }));
  };

  const reset = () => {
    setSortParams({ sort: SortType.Default, reverse: false });
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortParams.sort === SortType.Alphabet
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortParams.sort === SortType.Length
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            sortParams.reverse === true
              ? 'button is-warning'
              : 'button is-warning is-light'
          }
          onClick={handleToggleReverse}
        >
          Reverse
        </button>

        {(sortParams.sort !== SortType.Default ||
          sortParams.reverse === true) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
          // eslint-disable-next-line prettier/prettier, indent
        )}
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
