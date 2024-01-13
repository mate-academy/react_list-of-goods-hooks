import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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
  name = 'name',
  length = 'length',
}

const REVERSE = 'reverse';

export function getPreparedGoods(
  goods: string[],
  howSort: SortType | '',
  reverse = '',
) {
  const preparedGoods = [...goods];

  if (howSort) {
    preparedGoods.sort((good1, good2) => {
      switch (howSort) {
        case SortType.name:
          return good1.localeCompare(good2);

        case SortType.length:
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

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType | ''>('');
  const [reverse, setReverse] = useState('');
  const visibleGoods = getPreparedGoods(goodsFromServer, sortBy, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn(
              'button',
              'is-info',
              { 'is-light': sortBy !== SortType.name },
            )
          }
          onClick={() => setSortBy(SortType.name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn(
              'button',
              'is-success',
              { 'is-light': sortBy !== SortType.length },
            )
          }
          onClick={() => setSortBy(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn(
              'button',
              'is-warning',
              { 'is-light': !reverse },
            )
          }
          onClick={() => setReverse(reverse ? '' : REVERSE)}
        >
          Reverse
        </button>

        {(sortBy || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy('');
              setReverse('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
