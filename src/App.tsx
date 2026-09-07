import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

export enum SortType {
  None = '',
  Alphabet = 'alphabet',
  Length = 'length',
}
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

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
) {
  let preparedGoods = [...goods];

  if (sortField === SortType.Alphabet) {
    preparedGoods = preparedGoods.sort((val1: string, val2: string) =>
      val1.localeCompare(val2),
    );
  }

  if (sortField === SortType.Length) {
    preparedGoods = preparedGoods.sort(
      (val1: string, val2: string) => val1.length - val2.length,
    );
  }

  if (isReversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => {
            setSortField(SortType.Alphabet);
          }}
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SortType.Alphabet,
          })}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          onClick={() => setSortField(SortType.Length)}
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SortType.Length,
          })}
        >
          Sort by length
        </button>
        <button
          type="button"
          onClick={() => setIsReversed(isReversedChange => !isReversedChange)}
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>
        {sortField !== SortType.None || isReversed ? (
          <button
            type="button"
            onClick={() => {
              setSortField(SortType.None);
              setIsReversed(false);
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
