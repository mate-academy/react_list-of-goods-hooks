import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  SORT_FILED_ALPHABET = 'alphabet',
  SORT_FILED_LENGT = 'length',
  DEFAULT = '',
}

function getPrepareGoods(
  goods: string[],
  sortField: SortType,
  isReverse: boolean,
) {
  let prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SORT_FILED_ALPHABET:
          return good1.localeCompare(good2);
        case SortType.SORT_FILED_LENGT:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    prepearedGoods = prepearedGoods.reverse();

    return prepearedGoods;
  }

  return prepearedGoods;
}

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

export const App = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.DEFAULT);
  const [isReverse, setIsReverse] = useState<boolean>(false);
  const visibleGoods = getPrepareGoods(goodsFromServer, sortField, isReverse);

  const reset = () => {
    setSortField(SortType.DEFAULT);
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.SORT_FILED_ALPHABET)}
          type="button"
          className={cn(
            {
              'is-light': sortField !== SortType.SORT_FILED_ALPHABET,
            },
            'button is-info',
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.SORT_FILED_LENGT)}
          type="button"
          className={cn(
            {
              'is-light': sortField !== SortType.SORT_FILED_LENGT,
            },
            'button is-success',
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReverse(prev => !prev)}
          type="button"
          className={cn(
            {
              'is-light': !isReverse,
            },
            'button is-warning',
          )}
        >
          Reverse
        </button>

        {(isReverse || sortField) && (
          <button
            onClick={reset}
            type="button"
            className={cn(
              {
                'is-light': true,
              },
              'button is-danger',
            )}
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
