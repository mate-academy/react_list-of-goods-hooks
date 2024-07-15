import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';
import React, { useState } from 'react';

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

const SORT_BY = {
  ALPHABET: 'alphabetical',
  LENGTH: 'length',
  NONE: '',
} as const;

type Good = string;
type SortCriteria = (typeof SORT_BY)[keyof typeof SORT_BY];
type SortOptions = {
  sortCriteria: SortCriteria;
  reversed: boolean;
};

function sortGoods(
  goods: Good[],
  { sortCriteria, reversed }: SortOptions,
): Good[] {
  const goodsForSort = [...goods];

  if (sortCriteria) {
    goodsForSort.sort((firstGood: Good, secondGood: Good): number => {
      switch (sortCriteria) {
        case SORT_BY.ALPHABET:
          return firstGood.localeCompare(secondGood);
        case SORT_BY.LENGTH:
          return firstGood.length - secondGood.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    goodsForSort.reverse();
  }

  return goodsForSort;
}

export const App: React.FC = () => {
  const [sortCriteria, setSortCriteria] = useState<SortCriteria>(SORT_BY.NONE);
  const [reversed, setReversed] = useState(false);
  const goods = sortGoods(goodsFromServer, { sortCriteria, reversed });

  const reset = () => {
    setSortCriteria(SORT_BY.NONE);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortCriteria !== SORT_BY.ALPHABET,
          })}
          onClick={() => setSortCriteria(SORT_BY.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortCriteria !== SORT_BY.LENGTH,
          })}
          onClick={() => setSortCriteria(SORT_BY.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortCriteria !== SORT_BY.NONE || reversed) && (
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
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
