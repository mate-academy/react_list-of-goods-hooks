import { useState } from 'react';

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
  None = 'none',
  Alphabet = 'alphabet',
  Length = 'length',
}

function getPreparedGoods(
  goods: string[],
  { activeSort, isReversed }: { activeSort: SortType; isReversed: boolean },
) {
  const preparedGoods = [...goods];

  if (activeSort !== SortType.None) {
    preparedGoods.sort((good1, good2) => {
      switch (activeSort) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);
        case SortType.Length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [activeSort, setActiveSort] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    activeSort,
    isReversed,
  });

  const toggleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const reset = () => {
    setActiveSort(SortType.None);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeSort === SortType.Alphabet ? '' : 'is-light'}`}
          onClick={() => setActiveSort(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeSort === SortType.Length ? '' : 'is-light'}`}
          onClick={() => setActiveSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {(activeSort !== SortType.None || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
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
