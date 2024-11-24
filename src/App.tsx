import { useState } from 'react';
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
  DEFAULT = '',
  SORT_ALPHABET = 'SORT_ALPHABET',
  SORT_LENGTH = 'SORT_LENGTH',
}

type Props = {
  sortField: SortType;
  isReversed: boolean;
};

function getSortGoods(goods: string[], { sortField, isReversed }: Props) {
  let prepGoods = [...goods];

  if (sortField) {
    prepGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SORT_ALPHABET:
          return good1.localeCompare(good2);
        case SortType.SORT_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    prepGoods = prepGoods.reverse();
  }

  return prepGoods;
}

export const App: React.FC<Props> = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortField, setSortField] = useState<SortType>(SortType.DEFAULT);
  const visibleGoods = getSortGoods(goodsFromServer, { sortField, isReversed });

  const reverse = () => setIsReversed(prevIsReversed => !prevIsReversed);

  return (
    <div className="section content">
      {visibleGoods && (
        <div className="buttons">
          <button
            type="button"
            className={cn('button is-info', {
              'is-light': sortField !== SortType.SORT_ALPHABET,
            })}
            onClick={() => {
              setSortField(SortType.SORT_ALPHABET);
            }}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={cn('button is-success', {
              'is-light': sortField !== SortType.SORT_LENGTH,
            })}
            onClick={() => {
              setSortField(SortType.SORT_LENGTH);
            }}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={cn('button is-warning', {
              'is-light': !isReversed,
            })}
            onClick={reverse}
          >
            Reverse
          </button>

          {(isReversed || sortField) && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setIsReversed(false);
                setSortField(SortType.DEFAULT);
              }}
            >
              Reset
            </button>
          )}
        </div>
      )}

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
