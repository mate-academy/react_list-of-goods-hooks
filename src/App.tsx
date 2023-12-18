import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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
  NONE,
  ALPHABET,
  LENGTH,
}

export function getReorderedGoods(
  goods: string[], sortType: SortType, isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((good1, good2) => {
    if (sortType === SortType.ALPHABET) {
      return good1.localeCompare(good2);
    }

    if (sortType === SortType.LENGTH) {
      return good1.length - good2.length;
    }

    return 0;
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  const renderedGoods = visibleGoods.map((good) => (
    <li
      data-cy="Good"
      key={good}
    >
      {good}
    </li>
  ));

  return renderedGoods;
}

export const App: React.FC = () => {
  const [reversed, setReversed] = useState(false);

  const reverse = () => {
    setReversed(current => !current);
  };

  const [sorted, setSort] = useState(SortType.NONE);

  const sortByLength = () => {
    setSort(SortType.LENGTH);
  };

  const sortAlphabetically = () => {
    setSort(SortType.ALPHABET);
  };

  const reset = () => {
    setReversed(false);
    setSort(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sorted !== SortType.ALPHABET },
          )}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sorted !== SortType.LENGTH },
          )}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': !reversed },
          )}
          onClick={reverse}
        >
          Reverse
        </button>

        {
          (reversed || sorted !== SortType.NONE)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={reset}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        <ul>
          {getReorderedGoods(goodsFromServer, sorted, reversed)}
        </ul>
      </ul>
    </div>
  );
};
