import React, { useMemo, useState } from 'react';
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
  DEFAULT = '',
  LENGTH = 'Length',
  ALPHABET = 'Alphabet',
}

interface SortingParams {
  sortedBy: SortType;
  isReversed: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortedBy, isReversed = false }: SortingParams,
) {
  const preparedGoods = [...goods];

  if (sortedBy) {
    preparedGoods.sort((good1, good2) => {
      switch (sortedBy) {
        case SortType.ALPHABET:
          return good1.localeCompare(good2);
        case SortType.LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortedBy, setSortedBy] = useState<SortType>(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods = useMemo(() => getPreparedGoods(goodsFromServer, {
    sortedBy,
    isReversed,
  }), [sortedBy, isReversed]);

  const reset = () => {
    setIsReversed(false);
    setSortedBy(SortType.DEFAULT);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info ', {
            'is-light': sortedBy !== SortType.ALPHABET,
          })}
          onClick={() => setSortedBy(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortedBy !== SortType.LENGTH,
          })}
          onClick={() => setSortedBy(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed((reversed) => !reversed)}
        >
          Reverse
        </button>

        {sortedBy || isReversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => reset()}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map((good) => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
