import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

enum SortType {
  None, 'none',
  Alphabet, 'alphabet',
  Length, 'length',
}

type Reordering = {
  sortType: SortType,
  isReversed: boolean,
};

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

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: Reordering,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.Alphabet:
      visibleGoods.sort((goodA, goodB) => goodA.localeCompare(goodB));
      break;

    case SortType.Length:
      visibleGoods.sort((goodA, goodB) => goodA.length - goodB.length);
      break;

    default:
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const reverseToggle = () => setIsReversed(prev => (!prev));

  const reset = () => {
    setIsReversed(false);
    setSortBy(SortType.None);
  };

  const reorderedGoods = getReorderedGoods(
    goodsFromServer,
    {
      sortType: sortBy,
      isReversed,
    },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortBy !== SortType.Alphabet,
          })}
          onClick={() => (setSortBy(SortType.Alphabet))}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortBy !== SortType.Length,
          })}
          onClick={() => (setSortBy(SortType.Length))}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={reverseToggle}
        >
          Reverse
        </button>

        {(sortBy !== SortType.None || isReversed) && (
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
        {reorderedGoods.map((good: string) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
