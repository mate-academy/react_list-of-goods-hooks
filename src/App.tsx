import 'bulma/css/bulma.css';
import cn from 'classnames';
import { useState } from 'react';
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
  ALPHABET_SORT = 'Alphabet',
  LENGTH_SORT = 'Length',
  RESET = '',
}

type SortGoods = (
  goods: string[],
  filter: string,
  reverse: boolean,
) => string[];

const sortGoods: SortGoods = (goods, filter, reverse) => {
  const sortedGoods = [...goods];

  if (filter === SortType.ALPHABET_SORT) {
    sortedGoods.sort();
  }

  if (filter === SortType.LENGTH_SORT) {
    sortedGoods.sort((a, b) => a.length - b.length);
  }

  if (reverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [filterState, setFilterState] = useState('');
  const [reverse, setReverse] = useState(false);

  const isResetVisible = filterState || reverse;
  const filteredGoods = sortGoods(goodsFromServer, filterState, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': filterState !== SortType.ALPHABET_SORT,
          })}
          onClick={() => {
            setFilterState(SortType.ALPHABET_SORT);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': filterState !== SortType.LENGTH_SORT,
          })}
          onClick={() => {
            setFilterState(SortType.LENGTH_SORT);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => {
            setReverse(prev => !prev);
          }}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className={cn('button', 'is-danger', {
              'is-light': filterState !== SortType.RESET,
            })}
            onClick={() => {
              setFilterState(SortType.RESET);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {filteredGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
