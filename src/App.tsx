import 'bulma/css/bulma.css';
import './App.scss';

import cn from 'classnames';
import React, { useState } from 'react';

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

type GoodsList = string[];

export enum SortFieldType {
  sortAlphabetically = 'sortAlphabetically',
  sortByLength = 'sortByLength',
  sortByDefault = 'sortByDefault',
}

function getPreparedGoods(
  goods: GoodsList,
  sortField: SortFieldType,
  reverse: boolean,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortFieldType.sortAlphabetically:
          return good1.localeCompare(good2);

        case SortFieldType.sortByLength:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<string>('');
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const readyGoods
  = getPreparedGoods(
    goodsFromServer,
    sortField as SortFieldType,
    isReversed,
  );

  const handleSortAlphabetically
  = () => setSortField(SortFieldType.sortAlphabetically);

  const handleSortByLength = () => setSortField(SortFieldType.sortByLength);
  const handleReverse = () => setIsReversed(!isReversed);
  const handleReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  const isResetNeeded = (sortField || isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn(
              'button',
              'is-info',
              { 'is-light': sortField !== SortFieldType.sortAlphabetically },
            )
          }
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn(
              'button',
              'is-success',
              { 'is-light': sortField !== SortFieldType.sortByLength },
            )
          }
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn(
              'button',
              'is-warning',
              { 'is-light': isReversed === false },
            )
          }
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isResetNeeded && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {readyGoods.map(good => (
          <li data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
