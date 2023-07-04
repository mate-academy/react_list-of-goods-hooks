import React, { useState } from 'react';
import classNames from 'classnames';
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

interface FilterParams {
  sortField: string;
  isReversed: boolean;
}

enum SortField {
  Alph = 'Sort alphabetically',
  Lngth = 'Sort by length',
  None = 'none',
}

function getPreparedList(
  goods: string[],
  { sortField, isReversed }: FilterParams,
) {
  let prepareGoods = [...goods];

  if (sortField !== SortField.None) {
    prepareGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortField.Alph:
          return good1.localeCompare(good2);

        case SortField.Lngth:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    prepareGoods = prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortField.None);
  const [isReversed, setIsReversed] = useState(false);
  const listOfGoods
    = getPreparedList(goodsFromServer, { sortField, isReversed });

  const handleSortByAlph = () => {
    setSortField(SortField.Alph);
  };

  const handleSortByLngth = () => {
    setSortField(SortField.Lngth);
  };

  const handleToggleReverse = () => (
    isReversed ? setIsReversed(false) : setIsReversed(true)
  );

  const handleReset = () => {
    setIsReversed(false);
    setSortField(SortField.None);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleSortByAlph}
          type="button"
          className={
            classNames('button is-info',
              { 'is-light': sortField !== SortField.Alph })
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleSortByLngth}
          type="button"
          className={
            classNames('button is-success',
              { 'is-light': sortField !== SortField.Lngth })
          }
        >
          Sort by length
        </button>

        <button
          onClick={handleToggleReverse}
          type="button"
          className={
            classNames('button is-warning',
              { 'is-light': !isReversed })
          }
        >
          Reverse
        </button>

        {JSON.stringify(goodsFromServer) !== JSON.stringify(listOfGoods) && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {listOfGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
