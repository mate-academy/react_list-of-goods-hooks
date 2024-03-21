import React, { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  Alphabet = 'alphabet',
  Length = 'length',
  Default = 'default',
}

const goodsFromServer: string[] = [
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

const getPreparedGoods = (
  sortType: SortType,
  isReversed: boolean,
): string[] => {
  const goods = [...goodsFromServer];

  goods.sort((a, b) => {
    switch (sortType) {
      case SortType.Alphabet:
        return a.localeCompare(b);
      case SortType.Length:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    goods.reverse();
  }

  return goods;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isSortReversed, setSortIsReversed] = useState<boolean>(false);

  const reset = () => {
    setSortType(SortType.Default);
    setSortIsReversed(false);
  };

  const isResetButtonVisible = sortType !== SortType.Default || isSortReversed;

  const visibleGoods = getPreparedGoods(sortType, isSortReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SortType.Alphabet)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.Alphabet,
          })}
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => setSortType(SortType.Length)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.Length,
          })}
        >
          Sort by length
        </button>
        <button
          onClick={() => setSortIsReversed(prev => !prev)}
          type="button"
          className={cn('button is-warning ', {
            'is-light': !isSortReversed,
          })}
        >
          Reverse
        </button>
        {isResetButtonVisible && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((item: string) => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
