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
  Default = '',
  Alphabet = 'alphabet',
  Length = 'length',
}

function getPrerapeGoods(
  goods: string[],
  sortField: SortType,
  reverseField: boolean,
): string[] {
  let prepareGood = [...goods];

  prepareGood = prepareGood.sort((good1, good2) => {
    switch (sortField) {
      case SortType.Alphabet:
        return good1.localeCompare(good2);
      case SortType.Length:
        return good1[sortField] - good2[sortField];
      default:
        return 0;
    }
  });

  if (reverseField) {
    prepareGood = prepareGood.reverse();
  }

  return prepareGood;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.Default);
  const [reverseField, setReverseField] = useState(false);
  const visibleGoods = getPrerapeGoods(
    goodsFromServer,
    sortField,
    reverseField,
  );

  const handleReset = () => {
    setReverseField(false);
    setSortField(SortType.Default);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.Alphabet)}
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.Alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.Length,
          })}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !reverseField })}
          onClick={() => setReverseField(reverseField === false)}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
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
