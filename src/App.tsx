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

enum SortField {
  alphabet = 'alphabet',
  length = 'length',
}

function getPreparedGoods(
  goods: string[],
  sortingType: SortField | null,
): string[] {
  const preparedGoods = [...goods];

  if (sortingType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortingType) {
        case SortField.alphabet:
          return good1.localeCompare(good2);
        case SortField.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

export const App = () => {
  const [sortingType, setSortingType] = useState<SortField | null>(null);
  const [reversedState, setReversedState] = useState(false);
  let visibleGoods = getPreparedGoods(goodsFromServer, sortingType);
  const resetStates = () => {
    setSortingType(null);
    setReversedState(false);
  };

  if (reversedState) {
    visibleGoods = visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortingType !== SortField.alphabet,
          })}
          onClick={() => setSortingType(SortField.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortingType !== SortField.length,
          })}
          onClick={() => setSortingType(SortField.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversedState,
          })}
          onClick={() => setReversedState(!reversedState)}
        >
          Reverse
        </button>

        {(sortingType || reversedState) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetStates}
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
