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
  Alphabet = 'alphabet',
  Length = 'length',
  None = '',
}
interface SortOptions {
  sortCase: SortType;
  isReversed: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortCase, isReversed }: SortOptions,
): string[] {
  const preparedGoods = [...goods];

  if (sortCase === SortType.Alphabet) {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortCase === SortType.Length) {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortCase, setSortCase] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortCase,
    isReversed,
  });

  const sortByAlphabet = () => setSortCase(SortType.Alphabet);
  const sortByLength = () => setSortCase(SortType.Length);
  const toggleReverse = () => setIsReversed(prev => !prev);

  const reset = () => {
    setSortCase(SortType.None);
    setIsReversed(false);
  };

  const isInitialOrder = sortCase === SortType.None && isReversed === false;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByAlphabet}
          type="button"
          className={`button is-info ${sortCase === SortType.Alphabet ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={`button is-success ${sortCase === SortType.Length ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={toggleReverse}
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {!isInitialOrder && (
          <button onClick={reset} type="button" className="button is-danger">
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
