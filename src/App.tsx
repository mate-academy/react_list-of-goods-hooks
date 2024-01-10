import cn from 'classnames';
import React, { useState } from 'react';
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
  Alphabet = 'alphabet',
  Length = 'length',
  Default = '',
}

let isSorted = false;

const getSortedGoods = (
  goods: string[],
  sortField: SortType,
  isReverse: boolean,
) => {
  const sortedGoods = [...goods];

  if (sortField) {
    sortedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Alphabet:
          isSorted = true;

          return good1.localeCompare(good2);
        case SortType.Length:
          isSorted = true;

          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  } else if (isReverse) {
    isSorted = true;
  } else {
    isSorted = false;
  }

  return isReverse ? sortedGoods.reverse() : sortedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.Default);
  const [isReverse, setIsReverse] = useState(false);

  const visibleGoods = getSortedGoods(goodsFromServer, sortField, isReverse);

  const reset = () => {
    setIsReverse(false);
    setSortField(SortType.Default);
  };

  const reverse = () => (
    isReverse
      ? setIsReverse(false)
      : setIsReverse(true)
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.Alphabet)}
          className={cn(
            'button is-info',
            { 'is-light': sortField !== SortType.Alphabet },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortType.Length)}
          className={cn(
            'button is-success',
            { 'is-light': sortField !== SortType.Length },
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reverse}
          className={cn(
            'button is-warning',
            { 'is-light': !isReverse },
          )}
        >
          Reverse
        </button>

        {isSorted && (
          <button
            type="button"
            onClick={reset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
