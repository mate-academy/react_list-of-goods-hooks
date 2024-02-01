import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import React, { useState, useMemo } from 'react';

enum SortBy {
  Default = '',
  Name = 'name',
  Length = 'length',
}

const goodsFromServer = [
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

function getNewSortList(list: string[], sortValue: string, isReverse: boolean) {
  let valueReset = [...list];

  if (sortValue) {
    valueReset.sort((val1, val2) => {
      switch (sortValue) {
        case SortBy.Name:
          return val1.localeCompare(val2);
        case SortBy.Length:
          return val1.length - val2.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    valueReset = valueReset.reverse();
  }

  return valueReset;
}

export const App: React.FC = () => {
  const [sortValue, setSortValue] = useState(SortBy.Default);
  const [isReverse, setValueReverse] = useState(false);

  const getNewList: string[] = useMemo(() => getNewSortList(
    goodsFromServer,
    sortValue,
    isReverse,
  ), [goodsFromServer, sortValue, isReverse]);

  const reverseValue = () => {
    setValueReverse((prev) => !prev);
  };

  const handlerClickSortName = () => {
    setSortValue(SortBy.Name);
  };

  const handlerClickSortLength = () => {
    setSortValue(SortBy.Length);
  };

  const resetValues = () => {
    setSortValue(SortBy.Default);
    setValueReverse(false);
  };

  return (
    <div className="App">
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={cn({ 'is-light': sortValue !== SortBy.Name },
              'button is-info')}
            onClick={handlerClickSortName}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={cn(
              { 'is-light': sortValue !== SortBy.Length }, 'button is-success',
            )}
            onClick={handlerClickSortLength}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={cn({ 'is-light': !isReverse }, 'button is-warning')}
            onClick={reverseValue}
          >
            Reverse
          </button>

          {(isReverse || sortValue !== SortBy.Default) && (
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
          {getNewList.map((good) => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
