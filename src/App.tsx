import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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

enum SortBy {
  SORT_DEFAULT = '',
  SORT_NAME = 'name',
  SORT_LENGTH = 'lenght',
}

function getNewSortList(list:string[], sortValue:string, isReverse:boolean) {
  const valueReset = [...list];

  if (sortValue) {
    valueReset.sort((val1, val2) => {
      switch (sortValue) {
        case SortBy.SORT_NAME:
          return val1.localeCompare(val2);
        case SortBy.SORT_LENGTH:
          return val1.length - val2.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    valueReset.reverse();
  }

  return valueReset;
}

export const App: React.FC = () => {
  const [sortValue, setSortValue] = useState(SortBy.SORT_DEFAULT);
  const [isReverse, setValueReverse] = useState(false);
  const getNewList = getNewSortList(goodsFromServer, sortValue, isReverse);

  const reverseValue = () => {
    setValueReverse(prev => !prev);
  };

  const handlerClickSortName = () => {
    setSortValue(SortBy.SORT_NAME);
  };

  const handlerClickSortLength = () => {
    setSortValue(SortBy.SORT_LENGTH);
  };

  const resetValues = () => {
    setSortValue(SortBy.SORT_DEFAULT);
    setValueReverse(false);
  };

  return (
    <div className="App">
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={cn(
              { 'is-light': sortValue !== SortBy.SORT_NAME },
              'button is-info',
            )}
            onClick={handlerClickSortName}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={cn(
              { 'is-light': sortValue !== SortBy.SORT_LENGTH },
              'button is-success',
            )}
            onClick={handlerClickSortLength}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={cn(
              { 'is-light': !isReverse },
              'button is-warning',
            )}
            onClick={reverseValue}
          >
            Reverse
          </button>

          {(isReverse || sortValue !== '') && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={resetValues}
            >
              Reset
            </button>
          )}
        </div>

        <ul className="GoodList">
          {getNewList.map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
