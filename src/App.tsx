import React, { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
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
  Default = 'default',
  Alphabet = 'alhabet',
  Length = 'length',
}

function getPrepareGoods(
  goods: string[],
  sortField: SortType,
  revers: boolean,
): string[] {
  const prepareGoods: string[] = [...goods];

  if (sortField) {
    prepareGoods.sort((good1: string, good2: string) => {
      switch (sortField) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);
        case SortType.Length:
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
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [sortReverse, setSortReverse] = useState<boolean>(false);
  const [isReset, setIsReset] = useState<boolean>(false);

  const visibleGoods = getPrepareGoods(goodsFromServer, sortField, sortReverse);
  const reset = () => {
    setSortField(SortType.Default);
    setSortReverse(false);
    setIsReset(false);
  };

  const sortByLength = () => {
    setSortField(SortType.Length);
    setIsReset(true);
  };

  const sortByLetter = () => {
    setSortField(SortType.Alphabet);
    setIsReset(true);
  };

  const reverse = () => {
    if (sortReverse) {
      setSortReverse(false);
      setIsReset(false);

      return;
    }

    setIsReset(true);
    setSortReverse(true);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={sortByLetter}
          className={cn('button  is-info ', {
            'is-light': sortField !== SortType.Alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={cn('button is-success ', {
            'is-light': sortField !== SortType.Length,
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
        {isReset && (
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
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
