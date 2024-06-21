import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  byAlphabetically = 'Sort alphabetically',
  byLength = 'Sort by length',
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

function sortByType(
  goods: string[],
  sortType: SortType,
  reverse: boolean,
): string[] {
  const sortedGoods: string[] = [...goods];

  sortedGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.byAlphabetically:
        return good1.localeCompare(good2);

      case SortType.byLength:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (reverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType | ''>('');
  const [reverse, setReverse] = useState(false);

  const goods = sortByType(goodsFromServer, sortType as SortType, reverse);

  const reset = () => {
    setReverse(false);
    setSortType('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.byAlphabetically,
          })}
          onClick={() => setSortType(SortType.byAlphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.byLength,
          })}
          onClick={() => setSortType(SortType.byLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sortType !== '' || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => reset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
