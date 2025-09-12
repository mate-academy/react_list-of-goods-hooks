import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
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

type SortType = 'alph' | 'len' | 'none';

export const App: React.FC = () => {
  const [sort, setSort] = useState<SortType>('none');
  const [reversed, setReversed] = useState(false);

  function getSortedGoods() {
    const result = [...goodsFromServer];

    if (sort === 'alph') {
      result.sort((a, b) => b.localeCompare(a));
    } else if (sort === 'len') {
      result.sort((a, b) => a.length - b.length);
    }

    if (reversed) {
      result.reverse();
    }

    return result;
  }

  const displayedGoods = getSortedGoods();

  const showReset =
    sort !== 'none' ||
    reversed ||
    displayedGoods.join() !== goodsFromServer.join();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', { 'is-light': sort !== 'alph' })}
          onClick={() => setSort('alph')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', { 'is-light': sort !== 'len' })}
          onClick={() => setSort('len')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !reversed })}
          onClick={() => setReversed(prev => !prev)}
        >
          Reverse
        </button>

        {showReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSort('none');
              setReversed(false);
            }}
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
