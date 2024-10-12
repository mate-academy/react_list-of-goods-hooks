import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';

import './App.scss';

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
  String = 'sortByAlphabet',
  Number = 'sortByLength',
  Default = '',
}

export const App: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<SortType>(SortType.Default);
  const [reversed, setReversed] = useState<boolean>(false);
  const sortedGoods = [...goodsFromServer].sort(
    (good1: string, good2: string) => {
      switch (sortOrder) {
        case 'sortByAlphabet':
          return good1.localeCompare(good2);
        case 'sortByLength':
          return good1.length - good2.length;
        default:
          return 0;
      }
    },
  );

  const handleSortByAlphabet = useCallback(() => {
    setSortOrder(SortType.String);
  }, []);

  const handleSortByLength = useCallback(() => {
    setSortOrder(SortType.Number);
  }, []);

  const handleReverse = useCallback(() => {
    setReversed(!reversed);
  }, [reversed]);

  const handleReset = useCallback(() => {
    setSortOrder(SortType.Default);
    setReversed(false);
  }, []);

  if (reversed) {
    sortedGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortOrder !== 'sortByAlphabet',
          })}
          onClick={handleSortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortOrder !== 'sortByLength',
          })}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(reversed || sortOrder) && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map((good: string, id: number) => (
          <li data-cy="Good" key={good + id}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
