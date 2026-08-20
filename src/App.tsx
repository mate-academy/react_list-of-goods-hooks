import React, { useState } from 'react';
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

enum SortField {
  EMPTY = 'empty',
  LENGTH = 'length',
  ALPHABET = 'alphabet',
}

function getSortedGoods(
  goods: string[],
  sortedField: SortField,
  isReversed: boolean = false,
) {
  const newGoods = [...goods];

  if (sortedField === SortField.LENGTH) {
    newGoods.sort((good1, good2) => {
      return good1.length - good2.length;
    });
  } else if (sortedField === SortField.ALPHABET) {
    newGoods.sort((good1, good2) => {
      return good1.localeCompare(good2);
    });
  }

  if (isReversed) {
    newGoods.reverse();
  }

  return newGoods;
}

export const App: React.FC = () => {
  const [sortedField, setSortedField] = useState<SortField>(
    SortField.EMPTY,
  );
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const isDefaultOrder = sortedField === SortField.EMPTY && !isReversed;

  const visiableGoods = getSortedGoods(
    goodsFromServer,
    sortedField,
    isReversed,
  );

  const reset = () => {
    setSortedField(SortField.EMPTY);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortedField(SortField.ALPHABET);
          }}
          type="button"
          className={`button is-info ${sortedField === SortField.ALPHABET ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortedField(SortField.LENGTH);
          }}
          type="button"
          className={`button is-success ${sortedField === SortField.LENGTH ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReversed(!isReversed);
          }}
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {!isDefaultOrder && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visiableGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
