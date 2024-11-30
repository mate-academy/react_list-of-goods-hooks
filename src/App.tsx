import * as React from 'react';
import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

export const goodsFromServer: string[] = [
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
  Alphabetically = 'alph',
  Length = 'length',
  None = 'none',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
) {
  const preparedGoods = [...goods];

  if (sortField !== SortType.None) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Alphabetically:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);
  const isResetVisible = sortField !== SortType.None || isReversed;

  return (
    <React.Fragment>
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={classNames('button', 'is-info', {
              'is-light': sortField !== SortType.Alphabetically,
            })}
            onClick={() => setSortField(SortType.Alphabetically)}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={classNames('button', 'is-info', {
              'is-light': sortField !== SortType.Length,
            })}
            onClick={() => setSortField(SortType.Length)}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={classNames('button', 'is-warning', {
              'is-light': !isReversed,
            })}
            onClick={() => setIsReversed(prev => !prev)}
          >
            Reverse
          </button>

          {isResetVisible && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortField(SortType.None);
                setIsReversed(false);
              }}
            >
              Reset
            </button>
          )}
        </div>

        <ul>
          {visibleGoods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};
