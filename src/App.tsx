import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { SortGoods } from './components/SortGoods/SortGoods';

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
  az = 'az',
  length = 'length',
  reverse = 'reverse',
  default = '',
}

function getSortedGoods(goods: string[], type: SortType[]) {
  const sortedGoods = [...goods];

  if (type[0] === SortType.az) {
    sortedGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (type[0] === SortType.length) {
    sortedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (type[1] === SortType.reverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType]
  = React.useState<SortType[]>([SortType.default, SortType.default]);
  const sortedGoods = getSortedGoods(goodsFromServer, sortType);

  const isReset = sortType[0] !== SortType.default
    || sortType[1] !== SortType.default;

  const isReverse = () => setSortType(
    sortType[1] === SortType.reverse
      ? [sortType[0], SortType.default]
      : [sortType[0], SortType.reverse],
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn('button is-info', { 'is-light': sortType[0] !== SortType.az })
          }
          onClick={() => setSortType([SortType.az, sortType[1]])}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn('button is-success',
              { 'is-light': sortType[0] !== SortType.length })
          }
          onClick={() => setSortType([SortType.length, sortType[1]])}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn('button is-warning',
              { 'is-light': sortType[1] !== SortType.reverse })
          }
          onClick={isReverse}
        >
          Reverse
        </button>

        {(isReset) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setSortType([SortType.default, SortType.default])}
          >
            Reset
          </button>
        )}
      </div>

      <SortGoods goods={sortedGoods} />
    </div>
  );
};
