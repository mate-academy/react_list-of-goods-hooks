import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

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
  ALPHABETICALLY = 'alphabetically',
  BY_LENGTH = 'bylength',
  NONE = '',
}

function getPreparedGoods(
  goods: string[],
  { sortField, reverse }: { sortField: SortType; reverse: boolean },
) {
  const preparedGoods: string[] = [...goods];

  if (sortField) {
    preparedGoods.sort((good1: string, good2: string) => {
      switch (sortField) {
        case SortType.ALPHABETICALLY:
          return good1.localeCompare(good2);
        case SortType.BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const readyGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverse: isReversed,
  });

  const handleSortAlphabetically = () => setSortField(SortType.ALPHABETICALLY);

  const handleSortByLength = () => setSortField(SortType.BY_LENGTH);
  const handleReverse = () => setIsReversed(!isReversed);
  const handleReset = () => {
    setSortField(SortType.NONE);
    setIsReversed(false);
  };

  const isResetNeeded = sortField !== SortType.NONE || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.ALPHABETICALLY,
          })}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.BY_LENGTH,
          })}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': isReversed === false,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isResetNeeded && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {readyGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
