import React, { useState } from 'react';
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

enum SortBy {
  Name = 'name',
  Length = 'length',
  Default = '',
}

type SortType = SortBy | '';

function sortGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
): string[] {
  const copyOfGoods = [...goods];

  switch (sortType) {
    case SortBy.Name:
      copyOfGoods.sort((good1, good2) => {
        return good1.localeCompare(good2);
      });
      break;
    case SortBy.Length:
      copyOfGoods.sort((good1, good2) => {
        return good1.length - good2.length;
      });
      break;
    default:
      break;
  }

  if (isReversed) {
    copyOfGoods.reverse();
  }

  return copyOfGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReversed] = useState(false);

  const [sortType, setSortType] = useState<SortBy>(SortBy.Default);

  const sortedGoods = sortGoods(goodsFromServer, sortType, isReversed);
  const resetFilter = () => {
    setReversed(false);
    setSortType(SortBy.Default);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortType !== SortBy.Name },
          )}
          onClick={() => {
            setSortType(SortBy.Name);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': sortType !== SortBy.Length },
          )}
          onClick={() => {
            setSortType(SortBy.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            { 'is-light': isReversed === false },
          )}
          onClick={() => setReversed(preValue => !preValue)}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            type="button"
            className={cn(
              'button is-danger is-light',
            )}
            onClick={resetFilter}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
