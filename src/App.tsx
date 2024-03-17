import React from 'react';
import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

interface GetPreparedGoods {
  goods: string[],
  sortField: string,
  reversed: boolean
}

enum SortType {
  Alphabetically = 'Sort alphabetically',
  Length = 'Sort by length',
  Default = ''
}

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

function getPreparedGoods({ goods, sortField, reversed }: GetPreparedGoods): string[] {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((goods1, goods2) => {
      switch (sortField) {
        case SortType.Alphabetically:
          return goods1.localeCompare(goods2);

          case SortType.Length:
          return goods1.length - goods2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const visibleGoods = getPreparedGoods({ goods: goodsFromServer, sortField, reversed: isReversed });

  const reset = () => {
    setSortField(SortType.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SortType.Alphabetically);
          }}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.Alphabetically,
          })}
        >
          {SortType.Alphabetically}
        </button>
        <button
          onClick={() => setSortField(SortType.Length)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.Length,
          })}
        >
          {SortType.Length}
        </button>
        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>
        {(sortField || isReversed) && (
          <button
            type="button"
            onClick={reset}
            className="button is-danger is-light"
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
