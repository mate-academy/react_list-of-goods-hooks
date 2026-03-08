import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { ListGoods } from './list';
import classNames from 'classnames';

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

const SORT_BY_LENGTH = 'length';
const SORT_BY_ALPHA = 'alphabetically';

enum SortType {
  Default = '',
  Alphabetical = SORT_BY_ALPHA,
  Length = SORT_BY_LENGTH,
}

export const App: React.FC = () => {
  const [isReverse, setReverse] = useState(false);
  const [sortBy, setSortBy] = useState<SortType>(SortType.Default);

  const toggleReverse = () => setReverse(prev => !prev);
  const resetFilters = () => {
    setSortBy(SortType.Default);
    setReverse(false);
  };

  let visibleGoods = [...goodsFromServer].sort((a, b) => {
    switch (sortBy) {
      case SORT_BY_ALPHA:
        return a.localeCompare(b);
      case SORT_BY_LENGTH:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (isReverse) {
    visibleGoods = visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortBy !== SortType.Alphabetical,
          })}
          onClick={() => setSortBy(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortBy !== SortType.Length,
          })}
          onClick={() => setSortBy(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReverse,
          })}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {(sortBy || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetFilters}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ListGoods goods={visibleGoods} />
      </ul>
    </div>
  );
};
