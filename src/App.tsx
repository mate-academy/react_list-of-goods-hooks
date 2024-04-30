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

enum SortingOptions {
  BY_LENGTH = 'length',
  BY_ALPHABETICALLY = 'alphabet',
}

interface SortParams {
  sortedField: SortingOptions | null;
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
        case SortingOptions.BY_ALPHABETICALLY:
          return good1.localeCompare(good2);
        case SortingOptions.BY_LENGTH:
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
  const [sortedField, setSortedField] = useState<SortingOptions | null>(null);
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
          type="button"
          className={cn(
            { 'is-light': sortedField !== SortingOptions.BY_ALPHABETICALLY },
            'button is-info',
          )}
          onClick={() => setSortedField(SortingOptions.BY_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            { 'is-light': sortedField !== SortingOptions.BY_LENGTH },
            'button is-success',
          )}
          onClick={() => setSortedField(SortingOptions.BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({ 'is-light': !reversed }, 'button is-warning')}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>
        {isResetVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetState}
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
