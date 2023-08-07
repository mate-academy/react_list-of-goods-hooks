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

enum SortFIELD {
  LENGTH = 'Sort by length',
  ALFABETICALLY = 'Sort alphabetically',
  DEFAULT = '',
}

interface PreparedGoods {
  sortField: string;
  sortReverse: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortField, sortReverse }: PreparedGoods,
): string[] {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortFIELD.LENGTH:
          return good1.length - good2.length;

        case SortFIELD.ALFABETICALLY:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (sortReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortFIELD.DEFAULT);
  const [sortReverse, setToReverse] = useState(false);
  const visibleGoods
    = getPreparedGoods(goodsFromServer, { sortField, sortReverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortFIELD.ALFABETICALLY)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortFIELD.ALFABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortFIELD.LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortFIELD.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            if (sortReverse === false) {
              setToReverse(true);
            } else {
              setToReverse(false);
            }
          }}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': sortReverse === false,
          })}
        >
          Reverse
        </button>

        {
          sortField || sortReverse
            ? (
              <button
                onClick={() => {
                  setSortField(SortFIELD.DEFAULT);
                  setToReverse(false);
                }}
                type="button"
                className="button is-danger is-light"
              >
                Reset
              </button>
            )
            : SortFIELD.DEFAULT
        }
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
