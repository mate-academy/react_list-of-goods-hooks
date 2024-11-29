import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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
  NULL = 'null',
  SORT_BY_ALPHABET = 'alphabetSort',
  SORT_BY_LENGTH = 'goodsLength',
}

interface SortReverse {
  sortField: SortType;
  isReversed: boolean;
}

function sortGoods(
  goods: string[],
  { sortField, isReversed }: SortReverse,
): string[] {
  const newSortGoogs = [...goods];

  if (sortField === SortType.SORT_BY_ALPHABET) {
    newSortGoogs.sort((a, b) => a.localeCompare(b));
  } else if (sortField === SortType.SORT_BY_LENGTH) {
    newSortGoogs.sort((a, b) => a.length - b.length);
  }

  return isReversed ? newSortGoogs.reverse() : newSortGoogs;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.NULL);
  const [isReversed, setIsReversed] = useState(false);

  const reset = () => {
    setSortField(SortType.NULL);
    setIsReversed(false);
  };

  const listGoods = sortGoods(goodsFromServer, { sortField, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.SORT_BY_ALPHABET,
          })}
          onClick={() => setSortField(SortType.SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.SORT_BY_LENGTH,
          })}
          onClick={() => setSortField(SortType.SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(isReversed || sortField !== SortType.NULL) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {listGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
