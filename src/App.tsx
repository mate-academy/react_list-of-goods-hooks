import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
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

enum SortFieldValues {
  default = '',
  length = 'length',
  abc = 'alphabetically',
}

interface ListObserverState {
  sortType: SortFieldValues;
  reverse: boolean;
}

function getPreparedGoods(
  goods: string[],
  sortType: SortFieldValues,
  reverse: boolean,
) {
  let result = [...goods];

  if (sortType) {
    result.sort((good1, good2) => {
      switch (true) {
        case sortType === SortFieldValues.abc:
          return good1.localeCompare(good2);

        case sortType === SortFieldValues.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    result = result.reverse();
  }

  return result;
}

export const App: React.FC = () => {
  const [listObserver, setListObserver] = useState<ListObserverState>({
    sortType: SortFieldValues.default,
    reverse: false,
  });

  const preparedGoods = getPreparedGoods(
    goodsFromServer,
    listObserver.sortType,
    listObserver.reverse,
  );

  const handleSort = (sortType: SortFieldValues) => {
    setListObserver(prevState => ({
      ...prevState,
      sortType,
    }));
  };

  const handleReverse = () => {
    setListObserver(prevState => (
      { ...prevState, reverse: !prevState.reverse }
    ));
  };

  const handleReset = () => {
    setListObserver({
      sortType: SortFieldValues.default,
      reverse: false,
    });
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': listObserver.sortType !== SortFieldValues.abc },
          )}
          onClick={() => handleSort(SortFieldValues.abc)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': listObserver.sortType !== SortFieldValues.length },
          )}
          onClick={() => handleSort(SortFieldValues.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !listObserver.reverse },
          )}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(listObserver.sortType !== ''
          || listObserver.reverse) && (
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
        {preparedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
