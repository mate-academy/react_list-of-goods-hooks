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
  Name = 'name',
  Lenght = 'length',
  Default = '',
}

interface TypeSortedGoods {
  sortField?: string,
  isReversed?: boolean,
}

function getPreparedGoods(
  goods: string[],
  {
    sortField,
    isReversed,
  }: TypeSortedGoods,
): string[] {
  let preparedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SortType.Name:
        preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;

      case SortType.Lenght:
        preparedGoods
          .sort((good1, good2) => good1[sortField] - good2[sortField]);
        break;

      default:
        break;
    }
  }

  if (isReversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(SortType.Default);
  const [isReversed, setReverseField] = useState(false);

  const visibleGoods: string[] = getPreparedGoods(
    goodsFromServer,
    { sortField, isReversed },
  );

  const resetSortingSettings = () => {
    setSortField(SortType.Default);
    setReverseField(false);
  };

  const isSortByReversed = (sortField || isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.Name,
          })}
          onClick={() => {
            setSortField(SortType.Name);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.Lenght,
          })}
          onClick={() => {
            setSortField(SortType.Lenght);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setReverseField(!isReversed)}
        >
          Reverse
        </button>

        {isSortByReversed && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSortingSettings}
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
