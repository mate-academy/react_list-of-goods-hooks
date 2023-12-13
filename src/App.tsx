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

interface Sorting {
  sortField: string,
  isReverseField?: boolean
}

enum SortType {
  length = 'length',
  alpha = 'alpabetically',
}

function getGoods(goods: string[], { sortField, isReverseField }: Sorting) {
  const prepGoods = [...goods];

  if (sortField) {
    prepGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.length:
          return good1.length - good2.length;
        case SortType.alpha:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (isReverseField) {
    prepGoods.reverse();
  }

  return prepGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReverseField, setReverseField] = useState(false);
  const visibleGoods = getGoods(goodsFromServer, { sortField, isReverseField });
  const resetSorting = () => {
    setReverseField(false);
    setSortField('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            {
              'button is-info': sortField === SortType.alpha,
              'button is-info is-light': sortField !== SortType.alpha,
            },
          )}
          onClick={() => {
            setSortField(SortType.alpha);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            {
              'button is-success': sortField === SortType.length,
              'button is-success is-light': sortField !== SortType.length,
            },
          )}
          onClick={() => {
            setSortField(SortType.length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            {
              'button is-warning': isReverseField,
              'button is-warning is-light': isReverseField === false,
            },
          )}
          onClick={() => {
            setReverseField(!isReverseField);
          }}
        >
          Reverse
        </button>

        {isReverseField || sortField
          ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={resetSorting}
            >
              Reset
            </button>
          )
          : null}
      </div>

      <ul>
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
      </ul>
    </div>
  );
};
