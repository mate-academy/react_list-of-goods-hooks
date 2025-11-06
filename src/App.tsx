import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { GoodsList } from './GoodsList.tsx/GoodsList';
import { useState } from 'react';

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
  Alphabet = 'alphabetically',
  Length = 'length',
}

interface SortOptions {
  sortButton?: SortType;
  isReverse?: boolean;
}

function getPreperedGoods(goods: string[], options: SortOptions): string[] {
  const { sortButton, isReverse } = options;
  const preperedGoods = [...goods];

  if (sortButton) {
    preperedGoods.sort((good1, good2) => {
      switch (sortButton) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preperedGoods.reverse();
  }

  return preperedGoods;
}

export const App: React.FC = () => {
  const [sortButton, setSortButton] = useState<SortType | undefined>(undefined);
  const [isReverse, setIsReverse] = useState(false);
  const [goods, setGoods] = useState(goodsFromServer);
  const visibleGoods = getPreperedGoods(goods, {
    sortButton,
    isReverse,
  });

  const handleSort = (type: SortType) => setSortButton(type);
  const handleReverse = () => setIsReverse(prev => !prev);
  const handleReset = () => {
    setGoods(goodsFromServer);
    setSortButton(undefined);
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortButton !== SortType.Alphabet,
          })}
          onClick={() => {
            handleSort(SortType.Alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortButton !== SortType.Length,
          })}
          onClick={() => {
            handleSort(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortButton || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <GoodsList goods={visibleGoods} />
      </ul>
    </div>
  );
};
