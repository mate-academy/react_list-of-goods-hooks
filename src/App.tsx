import React from 'react';
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
  Title = 'title',
  Length = 'length',
}

interface SortBy {
  sortField: string;
  isReverse: boolean;
}

function getPrepearedGoods(
  goods: string[],
  { sortField, isReverse }: SortBy,
): string[] {
  const prepearedGoods: string[] = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Title:
          return good1.localeCompare(good2);
        case SortType.Length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse === true) {
    return prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods = getPrepearedGoods(goodsFromServer, {
    sortField,
    isReverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SortType.Title
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setSortField(SortType.Title)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SortType.Length
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReverse === true
              ? 'button is-warning'
              : 'button is-warning is-light'
          }
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>
        {(sortField || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setIsReverse(false);
            }}
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
