import React, { useState } from 'react';
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

enum SortType {
  DEFAULT = 'default',
  ALPHABETICAL = 'alphabetical',
  LENGTH = 'length',
}

export const App: React.FC = () => {
  const visibleGoods = [...goodsFromServer];

  const [sortBy, setSortBy] = useState<SortType>(SortType.DEFAULT);
  const [reverse, setReverse] = useState<boolean>(false);

  function toggleReverse(val: boolean,
    setVal: React.Dispatch<React.SetStateAction<boolean>>) {
    setVal(!val);
  }

  const sortByLength = sortBy === SortType.LENGTH;
  const sortByAlphabeth = sortBy === SortType.ALPHABETICAL;

  switch (sortBy) {
    case SortType.ALPHABETICAL:
      if (reverse) {
        visibleGoods
          .sort((good1, good2) => good1.localeCompare(good2)).reverse();
      } else {
        visibleGoods
          .sort((good1, good2) => good1.localeCompare(good2));
      }

      break;

    case SortType.LENGTH:
      if (reverse) {
        visibleGoods
          .sort((good1, good2) => good1.length - good2.length).reverse();
      } else {
        visibleGoods
          .sort((good1, good2) => good1.length - good2.length);
      }

      break;

    default:
      if (reverse) {
        visibleGoods.reverse();
      }

      break;
  }

  const reset = (): void => {
    setSortBy(SortType.DEFAULT);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': !sortByAlphabeth })}
          onClick={() => setSortBy(SortType.ALPHABETICAL)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': !sortByLength })}
          onClick={() => setSortBy(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning',
            { 'is-light': !reverse })}
          onClick={() => toggleReverse(reverse, setReverse)}
        >
          Reverse
        </button>

        {sortBy !== SortType.DEFAULT || reverse ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        ) : null}

      </div>

      <ul>
        {visibleGoods.map((good: string) => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
