import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
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
  Alphabet = 'alphabet',
  Length = 'length',
}

type Field = '' | SortField;

function getPrepearedGoods(
  goods: string[],
  sortField: Field,
  isReversed: boolean,
): string[] {
  const prepearedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SortField.Alphabet:
        prepearedGoods.sort((a, b) => a.localeCompare(b));
        break;
      case SortField.Length:
        prepearedGoods.sort((a, b) => a.length - b.length);
        break;
      default:
        return prepearedGoods;
    }
  }

  if (isReversed) {
    return prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<Field>('');
  const [isReversed, setIsReversed] = useState(false);

  const resetSort = () => {
    setSortField('');
    setIsReversed(false);
  };

  const handleSortClick = (field: Field) => {
    setSortField(field);
  };

  const handleReverseClick = () => {
    setIsReversed(prevIsReversed => !prevIsReversed);
  };

  const visibleGoods = getPrepearedGoods(
    goodsFromServer,
    sortField,
    isReversed,
  );

  const isResetButtonVisible = sortField || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => handleSortClick(SortField.Alphabet)}
          className={`button is-info ${sortField === SortField.Alphabet ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => handleSortClick(SortField.Length)}
          className={`button is-success ${sortField === SortField.Length ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverseClick}
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            type="button"
            onClick={resetSort}
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
