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

type State = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: State,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((a: string, b: string) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return a.localeCompare(b);

      case SortType.LENGTH:
        return a.length - b.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReverse] = useState(false);

  const visibleGoods = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );

  const reset = () => {
    setSortType(SortType.NONE);
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortType(SortType.ALPHABET)}
          className={cn('button is-info',
            { 'is-light': sortType !== SortType.ALPHABET })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortType(SortType.LENGTH)}
          className={cn('button is-success',
            { 'is-light': sortType !== SortType.LENGTH })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReverse(!isReversed)}
          className={cn('button is-warning',
            { 'is-light': !isReversed })}
        >
          Reverse
        </button>

        {(isReversed || sortType !== SortType.NONE) && (
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
        <ul>
          {visibleGoods.map((good) => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
}
