import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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
  Default,
  Alphabet,
  Length,
}

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState<string[]>(goodsFromServer);
  const [activeSort, setActiveSort] = useState<SortType>(SortType.Default);
  const [isReverse, setIsReverse] = useState<boolean>(false);

  const applySorting = (type: SortType, reversed: boolean): void => {
    const sortedGoods = [...goodsFromServer];

    if (type === SortType.Alphabet) {
      sortedGoods.sort((good1, good2) => good1.localeCompare(good2));
    }

    if (type === SortType.Length) {
      sortedGoods.sort((good1, good2) => good1.length - good2.length);
    }

    if (reversed) {
      sortedGoods.reverse();
    }

    setVisibleGoods(sortedGoods);
  };

  const sortAlphabetically = (): void => {
    applySorting(SortType.Alphabet, isReverse);
    setActiveSort(SortType.Alphabet);
  };

  const sortByLength = (): void => {
    applySorting(SortType.Length, isReverse);
    setActiveSort(SortType.Length);
  };

  const reverseGoods = (): void => {
    const next = !isReverse;

    setIsReverse(next);
    applySorting(activeSort, next);
  };

  const resetGoods = (): void => {
    setVisibleGoods(goodsFromServer);
    setActiveSort(SortType.Default);
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': activeSort !== SortType.Alphabet,
          })}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': activeSort !== SortType.Length,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {(activeSort !== SortType.Default || isReverse) && (
          <button
            type="button"
            className={cn('button is-danger')}
            onClick={resetGoods}
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
