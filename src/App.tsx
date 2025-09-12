import 'bulma/css/bulma.css';
import './App.scss';
import React, { useMemo, useState } from 'react';
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
  Alph = 'alph',
  Len = 'len',
  None = 'none',
}

export const App: React.FC = () => {
  const [sort, setSort] = useState<SortType>(SortType.None);
  const [reversed, setReversed] = useState(false);

  const handleSortAlphabetically = () => setSort(SortType.Alph);
  const handleSortByLength = () => setSort(SortType.Len);
  const handleToggleReverse = () => setReversed(prev => !prev);
  const handleReset = () => {
    setSort(SortType.None);
    setReversed(false);
  };

  const displayedGoods = useMemo(() => {
    const result = [...goodsFromServer];

    if (sort === SortType.Alph) {
      result.sort((a, b) => a.localeCompare(b));
    } else if (sort === SortType.Len) {
      result.sort((a, b) => a.length - b.length);
    }

    if (reversed) {
      result.reverse();
    }

    return result;
  }, [sort, reversed]);

  const showReset =
    sort !== SortType.None ||
    reversed ||
    displayedGoods.join() !== goodsFromServer.join();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sort !== SortType.Alph,
          })}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sort !== SortType.Len,
          })}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !reversed })}
          onClick={handleToggleReverse}
        >
          Reverse
        </button>

        {showReset && (
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
        {displayedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
