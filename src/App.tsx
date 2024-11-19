import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

enum SortType {
  Alphabet = 'alphabet',
  Length = 'length',
  Reset = 'reset',
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

function getPreparedGoods(
  goods: string[],
  options: { sortField: SortType | ''; isReversed: boolean },
): string[] {
  const prepearedSortGoods = [...goods];

  if (options.sortField === SortType.Reset) {
    return goods;
  }

  if (options.sortField) {
    prepearedSortGoods.sort((good1, good2) => {
      switch (options.sortField) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (options.isReversed) {
    prepearedSortGoods.reverse();
  }

  return prepearedSortGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const sortGoods: string[] = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const reset = () => {
    setSortField(SortType.Reset);
    setIsReversed(false);
  };

  const handleSortAlphabetically = () => {
    setSortField(SortType.Alphabet);
  };

  const handleSortByLength = () => {
    setSortField(SortType.Length);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const isOriginalOrder =
    JSON.stringify(sortGoods) === JSON.stringify(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.Alphabet,
          })}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.Length,
          })}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            className={cn('button', 'is-danger', {
              'is-light': sortField !== SortType.Reset,
            })}
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortGoods.map((good: string) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
