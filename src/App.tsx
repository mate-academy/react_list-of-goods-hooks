import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
  ALPHABETICALLY,
  BY_LENGTH,
  DEFAULT,
}

const getSortedProducts = (sortingType: SortType, isReversed: boolean) => {
  let sortedList: string[] = [];

  switch (sortingType) {
    case SortType.ALPHABETICALLY:
      sortedList = [...goodsFromServer].sort((item1, item2) =>
        item1.localeCompare(item2),
      );
      break;
    case SortType.BY_LENGTH:
      sortedList = [...goodsFromServer].sort(
        (item1, item2) => item1.length - item2.length,
      );
      break;
    case SortType.DEFAULT:
      sortedList = [...goodsFromServer];
      break;
  }

  if (isReversed) {
    sortedList.reverse();
  }

  return sortedList;
};

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [actualSortType, setActualSortType] = useState<SortType>(
    SortType.DEFAULT,
  );

  const sortedProducts = getSortedProducts(actualSortType, isReversed);

  const reverseList = () => {
    setIsReversed(prev => !prev);
  };

  const reset = () => {
    setIsReversed(false);
    setActualSortType(SortType.DEFAULT);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setActualSortType(SortType.ALPHABETICALLY)}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': actualSortType !== SortType.ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setActualSortType(SortType.BY_LENGTH)}
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': actualSortType !== SortType.BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={reverseList}
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(actualSortType !== SortType.DEFAULT || isReversed) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedProducts.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
