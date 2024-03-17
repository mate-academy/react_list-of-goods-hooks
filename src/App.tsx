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

const getPreparedGoods = (sortMethod: SortType, isReverse: boolean): string[] => {
  const goods = [...goodsFromServer];

  goods.sort((a, b) => {
    switch (sortMethod) {
      case SortType.Alphabet:
        return a.localeCompare(b);
      case SortType.Length:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (isReverse) {
    goods.reverse();
  }

  return goods;
};

export const App: React.FC = () => {
  const [goodSort, setGoodSort] = useState<SortType>(SortType.Default);
  const [isSortReverse, setSortIsReverse] = useState<boolean>(false);

  const reset = () => {
    setGoodSort(SortType.Default);
    setSortIsReverse(false);
  };

  const SortReverss = () => {
    return goodSort !== SortType.Default || isSortReverse;
  };

  const sorts = getPreparedGoods(goodSort, isSortReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setGoodSort(SortType.Alphabet)}
          type="button"
          className={cn('button is-info', {
            'is-light': goodSort !== SortType.Alphabet,
          })}
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => setGoodSort(SortType.Length)}
          type="button"
          className={cn('button is-success', {
            'is-light': goodSort !== SortType.Length,
          })}
        >
          Sort by length
        </button>
        <button
          onClick={() => setSortIsReverse(!isSortReverse)}
          type="button"
          className={cn('button is-warning ', {
            'is-light': !isSortReverse,
          })}
        >
          Reverse
        </button>
        {SortReverss() && (
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
        {sorts.map((item: string) => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
