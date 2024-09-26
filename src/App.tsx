import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

enum SortTypes {
  SORT_ALPHABETICALLY = 'alphabet',
  SORT_LENGTH = 'length',
  DEFAULT = '',
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

const SORT_ALPHABETICALLY = SortTypes.SORT_ALPHABETICALLY;
const SORT_LENGTH = SortTypes.SORT_LENGTH;

function getSortedGoods(sortBy: SortTypes, isReversed: boolean) {
  const sortArr = [...goodsFromServer];

  if (sortBy) {
    sortArr.sort((good1, good2) => {
      switch (sortBy) {
        case SortTypes.SORT_ALPHABETICALLY:
          return good1.localeCompare(good2);
        case SortTypes.SORT_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    sortArr.reverse();
  }

  return sortArr;
}

export const App: React.FC = ({}) => {
  const [sortBy, setSortBy] = useState<SortTypes>(SortTypes.DEFAULT);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const currentGoods = getSortedGoods(sortBy, isReversed);

  function reset() {
    setSortBy(SortTypes.DEFAULT);
    setIsReversed(false);
  }

  function changeReversed() {
    setIsReversed(!isReversed);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortBy(SORT_ALPHABETICALLY)}
          type="button"
          className={`button is-info ${sortBy !== SORT_ALPHABETICALLY && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortBy(SORT_LENGTH)}
          type="button"
          className={`button is-success ${sortBy !== SORT_LENGTH && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={changeReversed}
          type="button"
          className={`button is-warning ${!isReversed && 'is-light'}`}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {currentGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
