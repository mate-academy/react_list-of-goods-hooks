import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

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

enum SortType {
  name = 'name',
  length = 'length',
  toDefault = '',
}

interface Good {
  id: number;
  name: string;
  length: number;
}

type Goods = Good[];

const goodsWithProperty: Goods = goodsFromServer
  .map((good, i) => ({
    id: i + 1,
    name: good,
    length: good.length,
  }));

function prepeareGoods(
  goods: Goods,
  sortName: SortType,
  reverse: boolean,
): Goods {
  let prepearedGoods = [...goods];

  if (sortName) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortName) {
        case SortType.name:
          return good1[SortType.name].localeCompare(good2[SortType.name]);

        case SortType.length:
          return good1[SortType.length] - good2[SortType.length];

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    prepearedGoods = prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(SortType.toDefault);
  const [isReversed, setIsReversed] = useState(false);
  const sortedGoodsList = prepeareGoods(
    goodsWithProperty,
    sortField,
    isReversed,
  );
  const reset = () => {
    setSortField(SortType.toDefault);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.name,
          })}
          onClick={() => setSortField(SortType.name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.length,
          })}
          onClick={() => setSortField(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => (setIsReversed(!isReversed))}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoodsList.map(good => (
          <li data-cy="Good" key={good.id}>{good.name}</li>
        ))}
      </ul>
    </div>
  );
};
