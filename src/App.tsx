import React, { useMemo, useState } from 'react';
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
  default = 1,
  alphabetically,
  length,
  reverse,
  reset,
}

export const App: React.FC = () => {
  const [sort, setSort] = useState(SortType.default);
  const [isReversed, setIsReversed] = useState(false);

  const data = useMemo(() => {
    let sortedGoods = [...goodsFromServer];

    switch (sort) {
      case SortType.alphabetically:
        sortedGoods.sort((a, b) => a.localeCompare(b));
        break;

      case SortType.length:
        sortedGoods.sort((a, b) => a.length - b.length);
        break;

      case SortType.reset:
        sortedGoods = [...goodsFromServer];
        break;

      default:
        break;
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  }, [sort, isReversed]);

  const handleSort = (sortType: SortType) => {
    setSort(sortType);
  };

  const handleReverce = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSort(SortType.default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sort === SortType.alphabetically ? '' : 'is-light'}`}
          onClick={() => handleSort(SortType.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sort === SortType.length ? '' : 'is-light'}`}
          onClick={() => handleSort(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverce}
        >
          Reverse
        </button>

        {sort !== SortType.default || isReversed ? (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {data.map(g => (
          <li data-cy="Good" key={g}>
            {g}
          </li>
        ))}
      </ul>
    </div>
  );
};
