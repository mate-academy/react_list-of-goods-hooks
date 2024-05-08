import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  ABC = 'ABC',
  LENGTH = 'LENGTH',
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

const getPreparedGoods = (
  goods: string[],
  sortType: SortType | null,
  reverse: boolean,
): string[] => {
  const preparedGoods = [...goods];

  if (sortType === SortType.ABC) {
    preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
  } else if (sortType === SortType.LENGTH) {
    preparedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType | null>(null);
  const [reverse, setReverse] = useState<boolean>(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortType, reverse);

  const reverseSort = () => {
    setReverse(!reverse);
  };

  const resetSort = () => {
    setSortType(null);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.ABC,
          })}
          onClick={() => setSortType(SortType.ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={reverseSort}
        >
          Reverse
        </button>

        {(sortType !== null || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSort}
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
