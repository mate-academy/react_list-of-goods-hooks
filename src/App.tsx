import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

type Goods = string[];

export const goodsFromServer: Goods = [
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

type SortingBy = 'alphabetically' | 'lengthly' | null;
type SortingOrder = 'asc' | 'desc' | null;

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortingBy>(null);
  const [sortOrder, setSortOrder] = useState<SortingOrder>(null);
  const [reverse, setReverse] = useState(false);

  function handleSort(value: SortingBy) {
    if (value !== sortBy && !sortOrder) {
      setSortBy(value);
      setSortOrder('asc');
    }

    if (value !== sortBy && sortOrder === 'asc') {
      setSortBy(value);
      setSortOrder('asc');
    }

    if (value === sortBy && sortOrder === 'asc') {
      setSortOrder(null);
      setSortBy(null);
    }
  }

  function sorting(): Goods {
    const goods = [...goodsFromServer];

    if (sortBy) {
      goods.sort((goodA, goodB) => {
        let result = 0;

        if (sortBy === 'alphabetically') {
          result = goodA.localeCompare(goodB);
        }

        if (sortBy === 'lengthly') {
          result = goodA.length - goodB.length;
        }

        return result;
      });
    }

    if (reverse) {
      return goods.reverse();
    }

    return goods;
  }

  function reset() {
    setSortBy(null);
    setSortOrder(null);
    setReverse(false);
  }

  const visibleGoods = sorting();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== 'alphabetically',
          })}
          onClick={() => handleSort('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== 'lengthly',
          })}
          onClick={() => handleSort('lengthly')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': reverse !== true,
          })}
          onClick={() => setReverse(reverse === true ? false : true)}
        >
          Reverse
        </button>

        {(sortBy || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
