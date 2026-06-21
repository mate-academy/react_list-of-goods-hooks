import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

enum SortType {
  None = 'none',
  Alphabet = 'alphabet',
  Length = 'length',
}

interface Sorting {
  goods: string[];
  sorting: SortType;
  isReverse: boolean;
}

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

function sort({ goods, sorting, isReverse }: Sorting) {
  const sortGoods = [...goods];

  sortGoods.sort((good1, good2) => {
    switch (sorting) {
      case SortType.Alphabet:
        return good1.localeCompare(good2);
      case SortType.Length:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReverse) {
    sortGoods.reverse();
  }

  return sortGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [isReverse, setIsReverse] = useState(false);

  const newVisibleGoods = sort({
    goods: goodsFromServer,
    sorting: sortField,
    isReverse: isReverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            `button is-info ${sortField === SortType.Alphabet ? '' : 'is-light'}`,
          )}
          onClick={() => setSortField(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            `button is-success ${sortField === SortType.Length ? '' : 'is-light'}`,
          )}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            `button is-warning ${isReverse === true ? '' : 'is-light'}`,
          )}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {(sortField || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.None);
              setIsReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {newVisibleGoods.map((good: string) => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
