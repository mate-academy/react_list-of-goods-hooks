import { FC, useState } from 'react';
import cn from 'classnames';

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

enum SortBy {
  Default = '',
  Length = 'length',
  Alphabet = 'alphabet',
}

const getSortedGoods = (sortBy: SortBy, isReversed: boolean): string[] => {
  const goodsCopy = [...goodsFromServer];

  switch (sortBy) {
    case SortBy.Length:
      goodsCopy.sort((good1, good2) => (
        good1.length - good2.length
      ));
      break;
    case SortBy.Alphabet:
      goodsCopy.sort((good1, good2) => (
        good1.localeCompare(good2)
      ));
      break;

    default:
      break;
  }

  return isReversed
    ? goodsCopy.reverse()
    : goodsCopy;
};

export const App: FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState(SortBy.Default);
  const visibleGoods = getSortedGoods(sortBy, isReversed);

  const handleSortByAlphabet = () => {
    setSortBy(SortBy.Alphabet);
  };

  const handleSortByLength = () => {
    setSortBy(SortBy.Length);
  };

  const switchReverse = () => {
    setIsReversed(isReverted => !isReverted);
  };

  const handleReset = () => {
    setIsReversed(false);
    setSortBy(SortBy.Default);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': SortBy.Alphabet !== sortBy },
          )}
          onClick={handleSortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortBy !== SortBy.Length },
          )}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': isReversed === false },
          )}
          onClick={switchReverse}
        >
          Reverse
        </button>

        {
          (isReversed || sortBy)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={handleReset}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {
          visibleGoods.map(good => (
            <li key={good} data-cy="Good">{good}</li>
          ))
        }
      </ul>
    </div>
  );
};
