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
  None = '',
  Alphabet = 'alphabet',
  Length = 'length',
}

export const App: React.FC = () => {
  const [activeSort, setActiveSort] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const displayGoods = (() => {
    let result = [...goodsFromServer];

    if (activeSort === SortType.Alphabet) {
      result.sort((a, b) => a.localeCompare(b));
    } else if (activeSort === SortType.Length) {
      result.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      result = result.toReversed();
    }

    return result;
  })();

  const alphabetically = () => setActiveSort(SortType.Alphabet);
  const length = () => setActiveSort(SortType.Length);
  const reverse = () => setIsReversed(prev => !prev);
  const reset = () => {
    setActiveSort(SortType.None);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button ${activeSort === SortType.Alphabet ? 'is-info' : 'is-info is-light'}`}
          onClick={alphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button ${activeSort === SortType.Length ? 'is-info' : 'is-info is-light'}`}
          onClick={length}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button ${isReversed ? 'is-info' : 'is-info is-light'}`}
          onClick={reverse}
        >
          Reverse
        </button>

        {(activeSort !== SortType.None || isReversed) && (
          <button type="button" className="button is-info" onClick={reset}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {displayGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
