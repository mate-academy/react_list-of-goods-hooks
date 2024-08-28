import { useState, FC } from 'react';
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
  BY_NAME = 'name',
  BY_LENGTH = 'length',
  DEFAULT = '',
}

type FilterGoodsProps = {
  sortField: SortType;
  isReversed: boolean;
};

const getPreparedGoods = (
  goods: string[],
  { sortField, isReversed }: FilterGoodsProps,
) => {
  const sortedGoods = [...goods].sort((good1, good2) => {
    switch (sortField) {
      case SortType.BY_NAME:
        return good1.localeCompare(good2);

      case SortType.BY_LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  return isReversed ? sortedGoods.reverse() : sortedGoods;
};

export const App: FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);

  const goods = getPreparedGoods(goodsFromServer, { sortField, isReversed });

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setSortField(SortType.DEFAULT);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.BY_NAME,
          })}
          onClick={() => setSortField(SortType.BY_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.BY_LENGTH,
          })}
          onClick={() => setSortField(SortType.BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
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
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
