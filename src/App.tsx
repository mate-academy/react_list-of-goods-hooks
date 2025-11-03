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

type SortField = '' | 'alphabet' | 'length';

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = [...goodsFromServer];
  const isInitialState = sortField === '' && !isReversed;

  function handleReset() {
    setSortField('');
    setIsReversed(false);
  }

  function handleReverse() {
    setIsReversed(!isReversed);
  }

  function handleSort(field: SortField) {
    setSortField(field);
  }

  if (sortField) {
    switch (sortField) {
      case SORT_FIELD_ALPHABET:
        visibleGoods.sort();
        break;
      case SORT_FIELD_LENGTH:
        visibleGoods.sort((a, b) => a.length - b.length);
        break;
    }
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== SORT_FIELD_ALPHABET ? 'is-light' : ''}`}
          onClick={() => handleSort(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SORT_FIELD_LENGTH ? 'is-light' : ''}`}
          onClick={() => handleSort(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={() => handleReverse()}
        >
          Reverse
        </button>

        {isInitialState ? null : (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleReset()}
          >
            Reset
          </button>
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
