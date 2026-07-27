import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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
  Name = 'name',
  Length = 'length',
  Default = 'default'
}

type SortState = {
  sortValue: SortType,
  isReversed: boolean,
}

function getSortValue(values: string[], { sortValue, isReversed }: SortState): string[] {
  const value = [...values];

  value.sort((value1, value2) => {
    switch (sortValue) {
      case SortType.Name:
        return value1.localeCompare(value2);

      case SortType.Length:
        return value1.length - value2.length;

      case SortType.Default:
        return 0;

      default:
        return 0;
    }
  });

  if (isReversed) {
    value.reverse();
  }

  return value;
}

export const App = () => {
  const [sortValue, setSortValue] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const storegGoods = getSortValue(goodsFromServer, { sortValue, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortValue === SortType.Name ? '' : 'is-light'}`}
          onClick={() => setSortValue(SortType.Name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortValue === SortType.Length ? '' : 'is-light'}`}
          onClick={() => setSortValue(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortValue !== SortType.Default || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortValue(SortType.Default);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {storegGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
