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

enum SortType {
  Default = 'default',
  Alphabet = 'alphabet',
  Length = 'length',
}

// одна функція
function getUserSort(sortType: SortType, isReversed: boolean): string[] {
  const result = [...goodsFromServer];

  switch (sortType) {
    case SortType.Alphabet:
      result.sort((a, b) => a.localeCompare(b));
      break;

    case SortType.Length:
      result.sort((a, b) => a.length - b.length);
      break;

    case SortType.Default:
    default:
      break;
  }

  if (isReversed) {
    result.reverse();
  }

  return result;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const goods = getUserSort(sortType, isReversed);
  const isFiltered = sortType !== SortType.Default || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType === SortType.Alphabet ? '' : 'is-light'
          }`}
          onClick={() => setSortType(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortType === SortType.Length ? '' : 'is-light'
          }`}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {isFiltered && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(SortType.Default);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} className="Good" data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
