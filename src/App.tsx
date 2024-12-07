import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

import { Goods } from './Good/Good';

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
  None,
  Alphabetical,
  Length,
}

function sortGoods(
  input: string[],
  sortType: SortType,
  reverse: boolean,
): string[] {
  const preparedGoods = [...input];

  if (sortType !== SortType.None) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.Alphabetical:
          return good1.localeCompare(good2);
        case SortType.Length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState(SortType.None);
  const [reverse, setReverse] = useState(false);
  const visibleGoods = sortGoods(goodsFromServer, sortType, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.Alphabetical,
          })}
          onClick={() => setSortType(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.Length,
          })}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => {
            setReverse(!reverse ? true : false);
          }}
        >
          Reverse
        </button>

        {(sortType !== SortType.None || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(SortType.None);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <Goods goods={visibleGoods} />
    </div>
  );
};
