import React, { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

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

const SORT_ALPHABET = 'alphabet';
const SORT_LENGTH = 'length';

const getPreparedGoods = (sortMethod: string, isReverse: boolean): string[] => {
  const goods = [...goodsFromServer];

  goods.sort((a, b) => {
    switch (sortMethod) {
      case SORT_ALPHABET:
        return a.localeCompare(b);
      case SORT_LENGTH:
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
  const [goodSort, setGoodSort] = useState<string>('');
  const [isSortReverse, setSortIsReverse] = useState<boolean>(false);

  const reset = () => {
    setGoodSort('');
    setSortIsReverse(false);
  };

  const SortReverss = () => {
    return goodSort || isSortReverse;
  };

  const sorts = getPreparedGoods(goodSort, isSortReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setGoodSort(SORT_ALPHABET)}
          type="button"
          className={cn('button is-info', {
            'is-light': goodSort !== SORT_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => setGoodSort(SORT_LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': goodSort !== SORT_LENGTH,
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
