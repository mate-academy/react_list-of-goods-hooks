import { useState } from 'react';
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

const SORT_FIELD_LIGHT = 'is-light';

enum SortType {
  Alphabetical = 'alpha',
  Length = 'length',
  None = '',
}

function getPreparedGoods(
  { sortField, sortedLength, isReversed }: {
    sortField: SortType,
    sortedLength: SortType,
    isReversed: boolean,
  },
): string[] {
  let preparedGoods = [...goodsFromServer];

  if (sortField === SortType.Alphabetical) {
    preparedGoods = [...preparedGoods].sort(
      (good1, good2) => good1.localeCompare(good2),
    );
  }

  if (sortedLength === SortType.Length) {
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
  const [sortedLength, setSortedLength] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods: string[] = getPreparedGoods(
    { sortField, sortedLength, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={sortField === 'alpha' ? 'button is-info'
            : `button is-info ${SORT_FIELD_LIGHT}`}
          onClick={() => {
            setSortField(SortType.Alphabetical);
            setSortedLength(SortType.None);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={sortedLength === 'length' ? 'button is-success'
            : `button is-success ${SORT_FIELD_LIGHT}`}
          onClick={() => {
            setSortedLength(SortType.Length);
            setSortField(SortType.None);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={isReversed
            ? 'button is-warning'
            : `button is-warning ${SORT_FIELD_LIGHT}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortField || sortedLength || isReversed) && (
          <button
            type="button"
            className={`button is-danger ${SORT_FIELD_LIGHT}`}
            onClick={() => {
              setSortField(SortType.None);
              setSortedLength(SortType.None);
              setIsReversed(false);
            }}
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
