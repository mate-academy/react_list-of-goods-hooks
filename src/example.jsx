import { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

const SORT_BY_ABC = 'abc';
const SORT_BY_LENGTH = 'length';

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

function getPreparedGoods(goods, { sortBy, isReverse }) {
  const sortedGoods = [...goods];

  if (sortBy) {
    sortedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SORT_BY_ABC:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

function setReverse(isReverse, setIsRevers) {
  return isReverse === false ? setIsRevers(true) : setIsRevers(false);
}

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const goods = getPreparedGoods(goodsFromServer, { sortBy, isReverse });

  const resetSorting = () => {
    setIsReverse(false);
    setSortBy('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info',
            { 'is-light': sortBy !== SORT_BY_ABC })}
          onClick={() => setSortBy(SORT_BY_ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success',
            { 'is-light': sortBy !== SORT_BY_LENGTH })}
          onClick={() => setSortBy(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning',
            { 'is-light': isReverse === false })}
          onClick={() => setReverse(isReverse, setIsReverse)}
        >
          Reverse
        </button>

        {(sortBy || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSorting}
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
