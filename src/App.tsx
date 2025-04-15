import React from 'react';
import 'bulma/css/bulma.css';
import cn from 'classNames';
import './App.scss';
import { GoodsList } from './components/GoodsList';

enum SortType {
  alphabet = 'alphabet',
  length = 'length',
  default = '',
}

type OrderTypes = 'asc' | 'desc';

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

export const App: React.FC = () => {
  const [sortBy, setSortBy] = React.useState(SortType.default);
  const [orderBy, setOrderBy] = React.useState<OrderTypes>('asc');

  const changeOrder = (by: OrderTypes) => {
    setOrderBy(by);
  };

  const changeSortBy = (key: SortType = SortType.default) => {
    setSortBy(key);
  };

  const removeFilters = () => {
    changeOrder('asc');
    changeSortBy();
  };

  const ascOrder = () => orderBy === 'asc';

  const sortedGoods = () => {
    return [...goodsFromServer].sort((firstVal, secondVal) => {
      switch (sortBy) {
        case SortType.alphabet:
          return ascOrder()
            ? firstVal.localeCompare(secondVal)
            : secondVal.localeCompare(firstVal);
        case SortType.length: {
          const difference = firstVal.length - secondVal.length;

          if (difference >= 0) {
            return ascOrder() ? 1 : -1;
          }

          return ascOrder() ? -1 : 1;
        }

        default:
          return ascOrder() ? 1 : -1;
      }
    });
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== 'alphabet',
          })}
          onClick={() => changeSortBy(SortType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== 'length',
          })}
          onClick={() => changeSortBy(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': orderBy === 'asc',
          })}
          onClick={() => changeOrder(orderBy === 'asc' ? 'desc' : 'asc')}
        >
          Reverse
        </button>

        {(sortBy || orderBy === 'desc') && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={removeFilters}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={sortedGoods()} />
    </div>
  );
};
