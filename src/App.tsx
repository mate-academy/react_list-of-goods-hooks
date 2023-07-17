import { useState } from 'react';
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
  Default = 0,
  Name = 1,
  Length = 2,
}

type Filter = {
  sortField: SortType,
  isSorted: boolean,
};

function sortGoods(goods: string[], { sortField, isSorted }: Filter) {
  const localGoods = [...goods];

  if (sortField) {
    localGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Name:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isSorted) {
    localGoods.reverse();
  }

  return localGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [isSorted, setSorted] = useState(false);

  const makeSetSortField = (field: SortType) => () => setSortField(field);
  const makeSetSorted = (sorted: boolean) => () => setSorted(sorted);

  const showGoods = sortGoods(
    goodsFromServer,
    { sortField, isSorted },
  );

  const reset = () => {
    setSortField(SortType.Default);
    setSorted(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            ['button', 'is-info'],
            { 'is-light': sortField !== SortType.Name },
          )}
          onClick={makeSetSortField(SortType.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            ['button', 'is-success'],
            { 'is-light': sortField !== SortType.Length },
          )}
          onClick={makeSetSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            ['button', 'is-warning'],
            {
              'is-light': !isSorted,
            },
          )}
          onClick={makeSetSorted(!isSorted)}
        >
          Reverse
        </button>

        {(sortField || isSorted) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {showGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
