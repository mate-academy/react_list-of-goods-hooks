import cn from 'classnames';
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
  ALPH = 'alph',
  LNGTH = 'length',
  All = '',
}

type PreparedArgs = {
  sortField: SortType;
  isReversed: boolean;
};

function getPreparedGoods(
  goods: string[],
  { sortField, isReversed }: PreparedArgs,
): string[] {
  const goodsCopy = [...goods];

  if (sortField) {
    goodsCopy.sort((good1, good2) => {
      switch (sortField) {
        case SortType.ALPH:
          return good1.localeCompare(good2);
        case SortType.LNGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return goodsCopy.reverse();
  }

  return goodsCopy;
}

export const App: React.FC = () => {
  const [sortField, setSortFiels] = useState(SortType.All);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortFiels(SortType.ALPH)}
          type="button"
          className={cn('button is-info', {
            ' is-light': sortField !== SortType.ALPH,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortFiels(SortType.LNGTH)}
          type="button"
          className={cn('button is-success', {
            ' is-light': sortField !== SortType.LNGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed((prev) => !prev)}
          type="button"
          className={cn('button is-warning', {
            ' is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReversed(false);
              setSortFiels(SortType.All);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map((good) => (
            <li data-cy="Good">{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
