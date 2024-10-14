import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

enum SortType {
  DEFAULT = '',
  ALPHABETICALLY = 'Sort alphabetically',
  BY_LENGTH = 'Sort by length',
}

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

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setSortField(SortType.DEFAULT);
    setIsReversed(false);
  };

  const getSortedGoods = () => {
    const sortedGoods = [...goodsFromServer];

    if (sortField === SortType.ALPHABETICALLY) {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (sortField === SortType.BY_LENGTH) {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  const visibleGoods = getSortedGoods();

  const isOriginalOrder = sortField === SortType.DEFAULT && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SortType.ALPHABETICALLY
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => {
            setSortField(SortType.ALPHABETICALLY);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SortType.BY_LENGTH
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => {
            setSortField(SortType.BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed ? 'button is-warning' : 'button is-info is-light'
          }
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
