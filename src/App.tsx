import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

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
  ALPHABET = 'alphabet',
  LENGTH = 'length',
  DEFAULT = '',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
): string[] {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.ALPHABET:
          return good1.localeCompare(good2);

        case SortType.LENGTH:
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
  const [sortField, setSortField] = useState(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    isReversed,
  );

  const setReset = () => {
    setSortField(SortType.DEFAULT);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.ALPHABET)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReversed(!isReversed);
          }}
          type="button"
          className={cn('button is-warning', {
            'is-light': isReversed === false,
          })}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            onClick={setReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul className="list">
        {visibleGoods.map(good => (
          <li
            className="item"
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
