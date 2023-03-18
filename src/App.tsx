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

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

export function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case 1:
        return good1.localeCompare(good2);
      case 2:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(0);
  const [isReversed, setIsReversed] = useState(false);

  const sortByAlphabet = () => setSortType(1);
  const sortByLength = () => setSortType(2);
  const reverse = () => setIsReversed(current => !current);
  const reset = () => {
    setSortType(0);
    setIsReversed(false);
  };

  const reorderedGoods = getReorderedGoods(
    goodsFromServer, sortType, isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== 1 && 'is-light'}`}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== 2 && 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed && 'is-light'}`}
          onClick={reverse}
        >
          Reverse
        </button>

        {(isReversed !== false || sortType !== 0) && (
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
        {reorderedGoods.map(
          good => <li key={good} data-cy="Good">{good}</li>,
        )}
      </ul>
    </div>
  );
};
