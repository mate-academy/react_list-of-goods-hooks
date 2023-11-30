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
  default,
  alphabet,
  length,
}

interface GoodsDisplayParams {
  sortField: SortType,
  reverse: boolean,
}

function getPreparedGoods(
  initialGoods: string[],
  { sortField, reverse }: GoodsDisplayParams,
): string[] {
  const goods = [...initialGoods];

  if (sortField !== SortType.default) {
    goods.sort((good1, good2) => {
      if (sortField === SortType.alphabet) {
        return good1.localeCompare(good2);
      }

      if (sortField === SortType.length) {
        return good1.length - good2.length;
      }

      return 0;
    });
  }

  if (reverse) {
    goods.reverse();
  }

  return goods;
}

export const App: React.FC = () => {
  const { 0: sortField, 1: setSortField } = useState(SortType.default);
  const { 0: reverse, 1: setReverse } = useState(false);

  const goodsIsReset = sortField === SortType.default && !reverse;
  const preparedGoods = getPreparedGoods(
    goodsFromServer,
    { sortField, reverse },
  );

  const resetGoods = () => {
    setSortField(SortType.default);
    setReverse(false);
  };

  const addLightClass = (param: boolean) => param && 'is-light';

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${addLightClass(sortField !== SortType.alphabet)}`}
          onClick={() => setSortField(SortType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${addLightClass(sortField !== SortType.length)}`}
          onClick={() => setSortField(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${addLightClass(!reverse)}`}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {!goodsIsReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {preparedGoods.map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
