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
  default = '',
  alphabet = 'alphabet',
  length = 'length',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.alphabet:
          return good1.localeCompare(good2);

        case SortType.length:
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

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.default);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer, sortField, isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.alphabet)}
          type="button"
          className={classNames('button is-info', {
            'button is-info is-light': sortField !== SortType.alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.length)}
          type="button"
          className={classNames('button is-success', {
            'button is-success is-light': (sortField !== SortType.length),
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={classNames('button is-warning',
            { 'button is-warning is-light': isReversed !== true })}
        >
          Reverse
        </button>

        {sortField !== SortType.default || isReversed
          ? (
            <button
              onClick={() => {
                setSortField(SortType.default);
                setIsReversed(false);
              }}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          )
          : null}
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
