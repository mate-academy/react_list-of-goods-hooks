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

enum SortType {
  Alphabet = 'alphabet',
  Length = 'length',
}

interface SortParams {
  sortedField: SortType | null;
  reversed: boolean;
}

const getPreparedGoods = (
  goods: string[],
  { sortedField, reversed }: SortParams,
) => {
  const preparedGoods = [...goods];

  if (sortedField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortedField) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);
        case SortType.Length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortedField, setSortedField] = useState<SortType | null>(null);
  const [reversed, setReversed] = useState<boolean>(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortedField,
    reversed,
  });

  const isResetVisible = sortedField !== null || reversed !== false;

  const resetState = () => {
    setSortedField(null);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortedField(SortType.Alphabet)}
          type="button"
          className={cn(
            {
              'is-light': sortedField !== SortType.Alphabet,
            },
            'button is-info',
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortedField(SortType.Length)}
          type="button"
          className={cn(
            {
              'is-light': sortedField !== SortType.Length,
            },
            'button is-success',
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(value => !value)}
          type="button"
          className={cn(
            {
              'is-light': !reversed,
            },
            'button is-warning',
          )}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            onClick={resetState}
            type="button"
            className="button is-danger is-light"
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
  );
};
