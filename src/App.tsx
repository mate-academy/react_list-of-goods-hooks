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

const sortbyletter: string = 'sortByLetter';
const sortbylength: string = 'sortByLength';

function getPrepareGoods(
  goods: string[],
  sortField: string,
  revers: boolean,
): string[] {
  const prepareGoods: string[] = [...goods];

  if (sortField) {
    prepareGoods.sort((good1: string, good2: string) => {
      switch (sortField) {
        case sortbyletter:
          return good1.localeCompare(good2);
        case sortbylength:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (revers) {
    return prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [sortReverse, setSortReverse] = useState(false);
  const visibleGoods = getPrepareGoods(goodsFromServer, sortField, sortReverse);
  const isResetVisible = sortField !== '' || sortReverse;

  const reset = () => {
    setSortField('');
    setSortReverse(false);
  };

  const sortByLength = () => {
    setSortField(sortbylength);
  };

  const sortByLetter = () => {
    setSortField(sortbyletter);
  };

  const reverse = () => {
    if (sortReverse) {
      setSortReverse(false);

      return;
    }

    setSortReverse(true);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={sortByLetter}
          className={cn('button  is-info ', {
            'is-light': sortField !== sortbyletter,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={cn('button is-success ', {
            'is-light': sortField !== sortbylength,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={cn('button is-warning ', {
            'is-light': sortReverse === false,
          })}
        >
          Reverse
        </button>
        {isResetVisible && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
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
