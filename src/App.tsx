import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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
  alphabetically = 'alphabetically',
  byLength = 'length',
  default = '',
}

interface SortParams {
  sortField: SortType;
  isReversed: boolean;
}

function getPrepereGoods(
  goods: string[],
  { sortField, isReversed }: SortParams,
) {
  let prepareGoods = [...goods];

  if (sortField === SortType.alphabetically) {
    prepareGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortField === SortType.byLength) {
    prepareGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    prepareGoods = prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.default);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPrepereGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const handleSortAlphabetically = () => setSortField(SortType.alphabetically);
  const handleSortByLength = () => setSortField(SortType.byLength);
  const toggleReversed = () => setIsReversed(!isReversed);
  const reset = () => {
    setSortField(SortType.default);
    setIsReversed(false);
  };

  const alphabeticallyButtonClass = cn('button is-info', {
    'is-light': sortField !== SortType.alphabetically,
  });

  const lengthButtonClass = cn('button is-success', {
    'is-light': sortField !== SortType.byLength,
  });

  const reversedButtonClass = cn('button is-warning', {
    'is-light': !isReversed,
  });

  const isResetButtonVisible = sortField || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleSortAlphabetically}
          type="button"
          className={alphabeticallyButtonClass}
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleSortByLength}
          type="button"
          className={lengthButtonClass}
        >
          Sort by length
        </button>

        <button
          onClick={toggleReversed}
          type="button"
          className={reversedButtonClass}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
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
        {visibleGoods.map((good: string) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
