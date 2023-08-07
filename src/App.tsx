import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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
  Alphabetical = 'alpha',
  Length = 'length',
  None = '',
}

function getPreparedGoods(
  { sortField, isReversed }: {
    sortField: SortType,
    isReversed: boolean,
  },
): string[] {
  let preparedGoods = [...goodsFromServer];

  if (sortField === SortType.Alphabetical) {
    preparedGoods = [...preparedGoods].sort(
      (good1, good2) => good1.localeCompare(good2),
    );
  }

  if (sortField === SortType.Length) {
    preparedGoods = [...preparedGoods].sort(
      (good1, good2) => good1.length - good2.length,
    );
  }

  if (isReversed) {
    preparedGoods = [...preparedGoods].reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods: string[] = getPreparedGoods(
    { sortField, isReversed },
  );

  const handleSort = (
    newSortField: SortType,
  ) => () => setSortField(newSortField);

  const handleReset = () => {
    setSortField(SortType.None);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SortType.Alphabetical })}
          onClick={handleSort(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SortType.Length })}
          onClick={handleSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning',
            { 'is-light': !isReversed })}
          onClick={() => setIsReversed(prev => !prev)}
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
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
