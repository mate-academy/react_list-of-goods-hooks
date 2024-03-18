import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import React from 'react';

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

enum SortField {
  Default = '',
  Length = 'length',
  Alphabet = 'alphabet',
}

const prepareGoods = (sortField: SortField, isReverse: boolean): string[] => {
  const sortedGoods = [...goodsFromServer];

  if (sortField) {
    sortedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortField.Alphabet:
          return good1.localeCompare(good2);
        case SortField.Length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState<SortField>(SortField.Default);
  const [isReverse, setIsReverse] = useState(false);

  const resetAll = () => {
    setSortField(SortField.Default);
    setIsReverse(false);
  };

  const isResetButtonVisible = sortField || isReverse;

  const goodsList = prepareGoods(sortField, isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortField.Alphabet)}
          type="button"
          className={`button is-info ${sortField !== SortField.Alphabet && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortField.Length)}
          type="button"
          className={`button is-success ${sortField !== SortField.Length && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReverse(!isReverse)}
          type="button"
          className={`button is-warning ${!isReverse && 'is-light'}`}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            onClick={resetAll}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsList.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
