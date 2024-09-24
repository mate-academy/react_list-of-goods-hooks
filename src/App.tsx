import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  Alphabetical = 'ALPHA',
  Length = 'LENGTH',
}

type SortedList = {
  id: number;
  product: string;
};

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
  const [isReversed, setIsReversed] = useState(false);
  const [sortValue, setSortValue] = useState('');

  function getSortedList(
    array: string[],
    sortBy: string,
    isReverseActive: boolean,
  ) {
    const sortedArray: string[] = [...array].sort((a, b) => {
      switch (sortBy) {
        case SortType.Alphabetical:
          return a.localeCompare(b);
        case SortType.Length:
          return a.length - b.length;
        default:
          return 0;
      }
    });

    function listForRender(list: string[]): SortedList[] {
      return list.map((good: string, index: number) => {
        return { id: index, product: good };
      });
    }

    return isReverseActive
      ? listForRender(sortedArray.reverse())
      : listForRender(sortedArray);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortValue(SortType.Alphabetical)}
          type="button"
          className={
            sortValue !== SortType.Alphabetical
              ? 'button is-info is-light'
              : 'button is-info'
          }
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => setSortValue(SortType.Length)}
          type="button"
          className={
            sortValue !== 'LENGTH'
              ? 'button is-success is-light'
              : 'button is-info'
          }
        >
          Sort by length
        </button>
        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={
            !isReversed ? 'button is-warning is-light' : 'button is-warning'
          }
        >
          Reverse
        </button>
        {sortValue.length || isReversed ? (
          <button
            onClick={() => {
              setIsReversed(false);
              setSortValue('');
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {getSortedList(goodsFromServer, sortValue, isReversed).map(
          ({ id, product }) => (
            <li key={id} data-cy="Good">
              {product}
            </li>
          ),
        )}
      </ul>
    </div>
  );
};
