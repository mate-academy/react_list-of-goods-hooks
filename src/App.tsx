import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

export const goodsFromServer : string[] = [
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
  Default = 'default',
  Alphabet = 'alphabet',
  Length = 'length',
}

interface SortFields {
  sortField: SortType,
  isReverse: boolean,
}

function getPreparedGoods(
  goods: string[],
  { sortField, isReverse } :SortFields,
): string[] {
  const preparedGoods = [...goods];

  if (sortField !== SortType.Default) {
    preparedGoods.sort((goodA, goodB) => {
      switch (sortField) {
        case SortType.Alphabet:
          return goodA.localeCompare(goodB);

        case SortType.Length:
          return goodA.length - goodB.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [isReverse, setIsReverse] = useState<boolean>(false);
  const visibleGoods: string[] = getPreparedGoods(goodsFromServer,
    { sortField, isReverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.Alphabet,
          })}
          onClick={() => setSortField(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.Length,
          })}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReverse(!isReverse)}
          className={cn('button', 'is-warning', {
            'is-light': !isReverse,
          })}
        >
          Reverse
        </button>

        {(sortField !== SortType.Default || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.Default);
              setIsReverse(false);
            }}
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
