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
  BY_LENGTH = 'length',
  ALPHABETICALLY = 'alphabetically',
  DEFAULT = '',
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.DEFAULT);
  const [sortOrder, setSortOrder] = useState<boolean>(true);

  function prepareGoods(goods: string[], sortBy: string, order = true) {
    const preparedGoods = [...goods];

    switch (sortBy) {
      case SortType.BY_LENGTH: {
        preparedGoods.sort((goodA, goodB) => goodA.length - goodB.length);
        break;
      }

      case SortType.ALPHABETICALLY: {
        preparedGoods.sort((goodA, goodB) => goodA.localeCompare(goodB));
        break;
      }

      default:
        break;
    }

    return order ? preparedGoods : preparedGoods.reverse();
  }

  function resetHandler(): void {
    setSortField(SortType.DEFAULT);
    setSortOrder(true);
  }

  const visibleGoods = prepareGoods(goodsFromServer, sortField, sortOrder);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SortType.ALPHABETICALLY,
          })}
          onClick={() => setSortField(SortType.ALPHABETICALLY)}
        >
          Sort {SortType.ALPHABETICALLY}
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SortType.BY_LENGTH,
          })}
          onClick={() => setSortField(SortType.BY_LENGTH)}
        >
          Sort by {SortType.BY_LENGTH}
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': sortOrder !== false,
          })}
          onClick={() => {
            setSortOrder(prevOrder => !prevOrder);
          }}
        >
          Reverse
        </button>

        {(sortField !== '' || !sortOrder) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetHandler}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods &&
            visibleGoods.map(good => (
              <li key={good} data-cy="Good">
                {good}
              </li>
            ))}
        </ul>
      </ul>
    </div>
  );
};
