import cn from 'classnames';
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsList } from './components/GoodsList';

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
  NONE,
  ALPHABET,
  LENGTH,
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [reverse, setReverse] = useState(false);

  const handleSort = (type: SortType) => {
    if (sortType === type) {
      setReverse(curr => !curr);
    } else {
      setSortType(type);
      setReverse(false);
    }
  };

  const sortedGoods = [...goodsFromServer].sort((a, b) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return reverse ? b.localeCompare(a) : a.localeCompare(b);
      case SortType.LENGTH:
        return reverse ? b.length - a.length : a.length - b.length;
      default:
        return 0;
    }
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={() => handleSort(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={() => handleSort(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(curr => !curr)}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || reverse) && (
          <button
            type="button"
            className={cn('button is-danger', {
              'is-light': !reverse,
            })}
            onClick={() => {
              setSortType(SortType.NONE);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <GoodsList goodsList={reverse ? sortedGoods.reverse() : sortedGoods} />
    </div>
  );
};
