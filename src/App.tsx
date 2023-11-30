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

enum SortType {
  None = '',
  Alphabetically = 'alphabetically',
  Length = 'length',
}

function sortGoods(
  goods: string[],
  sortMethod: SortType,
  isReversed: boolean,
): string[] {
  const sortedGoods = [...goods];

  if (sortMethod) {
    sortedGoods.sort((good1, good2) => {
      switch (sortMethod) {
        case SortType.Alphabetically:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortMethod, setSortMethod] = useState(SortType.None);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = sortGoods(goodsFromServer, sortMethod, isReversed);

  const resetGoods = () => {
    setSortMethod(SortType.None);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortMethod !== SortType.Alphabetically },
          )}
          onClick={() => setSortMethod(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortMethod !== SortType.Length },
          )}
          onClick={() => setSortMethod(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortMethod || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
