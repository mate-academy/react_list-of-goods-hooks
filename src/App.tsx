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

enum SortType {
  default = '',
  alphabet = 'alphabet',
  length = 'length',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  isReverse: boolean,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.length:
          return good1.length - good2.length;

        case SortType.alphabet:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.default);
  const [isReverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    isReverse,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.alphabet)}
          type="button"
          className={
            classNames('button is-info', {
              'is-light': sortField !== SortType.alphabet,
            })
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.length)}
          type="button"
          className={
            classNames('button is-success', {
              'is-light': sortField !== SortType.length,
            })
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setReverse(!isReverse);
          }}
          type="button"
          className={
            classNames('button is-warning', {
              'is-light': isReverse !== true,
            })
          }
        >
          Reverse
        </button>

        {
          sortField || isReverse
            ? (
              <button
                onClick={() => {
                  setSortField(SortType.default);
                  setReverse(false);
                }}
                type="button"
                className="button is-danger is-light"
              >
                Reset
              </button>
            )
            : null
        }
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
