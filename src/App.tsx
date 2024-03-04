import './App.scss';
import 'bulma/css/bulma.css';

import { useState } from 'react';
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
  LEN = 'len',
  NAME = 'name',
}

interface SortParams {
  sortField: string;
  isReversed: boolean;
}

function getListGoods(
  goods: string[],
  { sortField, isReversed }: SortParams,
): string[] {
  const listGoods: string[] = [...goods];

  if (sortField) {
    listGoods.sort((goodB, goodA) => {
      switch (sortField) {
        case SortType.LEN:
          return goodB.length - goodA.length;

        case SortType.NAME:
          return goodB.localeCompare(goodA);

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    listGoods.reverse();
  }

  return listGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods: string[] = getListGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const onReverse = () => setIsReversed(prevIsReversed => !prevIsReversed);
  const onReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.NAME,
          })}
          onClick={() => setSortField(SortType.NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.LEN,
          })}
          onClick={() => setSortField(SortType.LEN)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={onReverse}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={onReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
