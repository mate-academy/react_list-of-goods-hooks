import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
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
  noSort = '',
  leng = 'leng',
  alph = 'alph',
}

interface StateInterface {
  sortType: SortType;
  isReverse: boolean;
}

const updateGoods = (
  goods: string[], { sortType, isReverse }: StateInterface,
) => {
  if (sortType === '' && !isReverse) {
    return goods;
  }

  const udatedGoods = [...goods];

  if (sortType === SortType.leng || sortType === SortType.alph) {
    udatedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.leng:
          return good1.length - good2.length;
        case SortType.alph:
          return good1.localeCompare(good2);
        default:
          throw new Error('Unbelievable error');
      }
    });
  }

  if (isReverse) {
    udatedGoods.reverse();
  }

  return udatedGoods;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.noSort);
  const [isReverse, setIsReverse] = useState(false);

  const goods = updateGoods(goodsFromServer, { sortType, isReverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': SortType.alph !== sortType,
          })}
          onClick={() => setSortType(SortType.alph)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': SortType.leng !== sortType,
          })}
          onClick={() => setSortType(SortType.leng)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {(sortType || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(SortType.noSort);
              setIsReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
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
