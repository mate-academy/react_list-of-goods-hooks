import React, { useEffect, useState } from 'react';
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
  Default = 'default',
  Alphabet = 'alphabet',
  Length = 'length',
}

export const App: React.FC = () => {
  const [visibleGoods, setVisibleGoods] = useState(() => [...goodsFromServer]);
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const isChanged = sortType !== SortType.Default || isReversed;

  const sortByAlphabet = () => {
    setSortType(SortType.Alphabet);
  };

  const alphabetClass =
    sortType === SortType.Alphabet
      ? 'button is-info'
      : 'button is-info is-light';

  const sortByLength = () => {
    setSortType(SortType.Length);
  };

  const lengthClass =
    sortType === SortType.Length
      ? 'button is-success'
      : 'button is-success is-light';

  const sortByReverse = () => {
    setIsReversed(prev => !prev);
  };

  const reverseClass = isReversed
    ? 'button is-warning'
    : 'button is-warning is-light';

  const resetClass = isChanged
    ? 'button is-danger'
    : 'button is-danger is-light';

  useEffect(() => {
    const result = [...goodsFromServer];

    if (sortType === SortType.Alphabet) {
      result.sort((a, b) => a.localeCompare(b));
    }

    if (sortType === SortType.Length) {
      result.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      result.reverse();
    }

    setVisibleGoods(result);
  }, [sortType, isReversed]);

  const handleReset = () => {
    setSortType(SortType.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={alphabetClass}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button type="button" className={lengthClass} onClick={sortByLength}>
          Sort by length
        </button>

        <button type="button" className={reverseClass} onClick={sortByReverse}>
          Reverse
        </button>

        {isChanged && (
          <button type="button" className={resetClass} onClick={handleReset}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good: string) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
