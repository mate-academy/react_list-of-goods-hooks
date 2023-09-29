import React, { useState } from 'react';
import cn from 'classnames';

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
  Alphabet = 'string',
  Length = 'number',
  Default = '',
}

type UpdateProps = {
  goods: string[],
  isSorted: SortType,
  isReversed: boolean,
};

function getActionsGoods({
  goods,
  isSorted,
  isReversed,
}: UpdateProps) {
  const prepareGoods = [...goods];

  if (isSorted) {
    prepareGoods.sort((good1, good2) => {
      switch (isSorted) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.Default);
  const [isGoodsReversed, setIsGoodsReversed] = useState(false);
  const visibleGoods = getActionsGoods(
    {
      goods: goodsFromServer,
      isSorted: sortField,
      isReversed: isGoodsReversed,
    },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortField !== SortType.Alphabet },
          )}
          onClick={() => {
            setSortField(SortType.Alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': sortField !== SortType.Length },
          )}
          onClick={() => {
            setSortField(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            { 'is-light': !isGoodsReversed },
          )}
          onClick={() => {
            setIsGoodsReversed(!isGoodsReversed);
          }}
        >
          Reverse
        </button>

        {(sortField || isGoodsReversed)
        && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.Default);
              setIsGoodsReversed(false);
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
