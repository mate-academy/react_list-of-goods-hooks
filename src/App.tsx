import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  Default = 'default',
  Alphabet = 'alphabet',
  Length = 'length',
}

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

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const getSortedGoods = (): string[] => {
    let sorted = [...goodsFromServer];

    switch (sortType) {
      case SortType.Alphabet:
        sorted.sort((a, b) => a.localeCompare(b));
        break;
      case SortType.Length:
        sorted.sort((a, b) => a.length - b.length);
        break;
      default:
        sorted = [...goodsFromServer];
    }

    if (isReversed) {
      sorted.reverse();
    }

    return sorted;
  };

  const reset = () => {
    setSortType(SortType.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.Alphabet ? '' : 'is-light'}`}
          onClick={() => setSortType(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.Length ? '' : 'is-light'}`}
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

        {(sortType !== SortType.Default || isReversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {getSortedGoods().map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
