import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

import { List } from './Components/List';

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
  alpa = 'alpha',
  length = 'length',
}

function sortingFunction(goods: string[], sortBy:SortType, isReverse:boolean) {
  const list = [...goods];

  list.sort((a, b) => {
    switch (sortBy) {
      case SortType.alpa:
        return a.localeCompare(b);
      case SortType.length:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (isReverse) {
    list.reverse();
  }

  return list;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState('');

  const [isReverse, setReverse] = useState(false);

  const changedGoods = sortingFunction(
    goodsFromServer, sortBy as SortType, isReverse,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortBy !== SortType.alpa },
          )}
          onClick={() => (setSortBy(SortType.alpa))}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': sortBy !== SortType.length },
          )}
          onClick={() => (setSortBy(SortType.length))}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            { 'is-light': !isReverse },
          )}
          onClick={() => (setReverse(prev => (!prev)))}
        >
          Reverse
        </button>
        {(sortBy !== '' || isReverse) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortBy('');
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <List
        goods={changedGoods}
      />
    </div>
  );
};
