import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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
  Alpha = 'alpha',
  Length = 'length',
  None = '',
}

type IsReverse = boolean;

function getPreparedGoods(goods: string[],
  sortBy: SortType,
  isReversed: IsReverse) :string[] {
  const preparedGoods = [...goods];

  if (sortBy) {
    preparedGoods.sort((a, b) => {
      switch (sortBy) {
        case SortType.Alpha:
          return a.localeCompare(b);

        case SortType.Length:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortType.None);
  const [isReversed, setIsReversed] = useState(false);
  const allGoods = getPreparedGoods(goodsFromServer, sortBy, isReversed);
  const resetSort = () => {
    setSortBy(SortType.None);
    setIsReversed(false);
  };

  const isReset = sortBy || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn(
              'button',
              'is-info',
              { 'is-light': sortBy !== SortType.Alpha },
            )
          }
          onClick={() => setSortBy(SortType.Alpha)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn(
              'button',
              'is-success',
              { 'is-light': sortBy !== SortType.Length },
            )
          }
          onClick={() => setSortBy(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn(
              'button',
              'is-warning',
              { 'is-light': !isReversed },
            )
          }
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSort}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {allGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
