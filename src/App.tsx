import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';

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
  'alphabetically' = 'alphabetically',
  'byLength' = 'byLength',
}

function getPreparedGoods(
  goods: string[],
  { sortType }: { sortType: SortType | null },
  isReversed: boolean,
): string[] {
  const preparedGoods = [...goods];

  if (sortType === SortType.alphabetically) {
    preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortType === SortType.byLength) {
    preparedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType | null>(null);
  const [isReversed, setReversed] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortType },
    isReversed,
  );

  const handleReset = () => {
    setSortType(null);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SortType.alphabetically)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.alphabetically,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SortType.byLength)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.byLength,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!isReversed)}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortType !== null || isReversed) && (
          <button
            onClick={handleReset}
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
