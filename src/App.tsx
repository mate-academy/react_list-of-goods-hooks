import { useState } from 'react';

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

enum SortMethod {
  Alphabet = 'alphabet',
  Length = 'length',
  Default = '',
}

const prepareGoods = (
  sortMethod: SortMethod,
  isListReversed: boolean,
): string[] => {
  const goodsCopy = [...goodsFromServer];

  if (sortMethod) {
    goodsCopy.sort((a, b) => {
      switch (sortMethod) {
        case SortMethod.Alphabet:
          return a.localeCompare(b);
        case SortMethod.Length:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (isListReversed) {
    goodsCopy.reverse();
  }

  return goodsCopy;
};

export const App = () => {
  const [sortMethod, setSortMethod] = useState<SortMethod>(SortMethod.Default);
  const [isListReversed, setIsListReversed] = useState(false);

  const resetAll = () => {
    setSortMethod(SortMethod.Default);
    setIsListReversed(false);
  };

  const isResetButtonVisible = sortMethod || isListReversed;

  const goodsList = prepareGoods(sortMethod, isListReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortMethod(SortMethod.Alphabet)}
          type="button"
          className={`button is-info ${sortMethod !== SortMethod.Alphabet && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortMethod(SortMethod.Length)}
          type="button"
          className={`button is-success ${sortMethod !== SortMethod.Length && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsListReversed(!isListReversed)}
          type="button"
          className={`button is-warning ${!isListReversed && 'is-light'}`}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            onClick={resetAll}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsList.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
