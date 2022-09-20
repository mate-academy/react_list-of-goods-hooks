import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
  NONE,
  ALPABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((productA, productB) => {
    switch (sortType) {
      case SortType.LENGTH:
        return productA.length - productB.length;

      case SortType.ALPABET:
        return productA.localeCompare(productB);

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSort] = useState(SortType.NONE);
  const [isReversed, setRevers] = useState(false);
  const visibleGoods = getReorderedGoods(
    goodsFromServer, { sortType, isReversed },
  );

  const hiddeResetButton = sortType !== SortType.NONE || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPABET },
          )}
          onClick={() => setSort(SortType.ALPABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={() => setSort(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setRevers(!isReversed)}
        >
          Reverse
        </button>

        {(hiddeResetButton) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSort(SortType.NONE);
              setRevers(!isReversed);
            }}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        <ul>
          {visibleGoods.map(product => (
            <li
              key={product}
              data-cy="Good"
            >
              {product}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
