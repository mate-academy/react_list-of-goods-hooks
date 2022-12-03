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

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.NONE:
      break;

    case SortType.ALPHABET:
      visibleGoods.sort(
        (good1, good2) => good1.localeCompare(good2),
      );
      break;

    case SortType.LENGTH:
      visibleGoods.sort(
        (good1, good2) => (good1.length - good2.length),
      );
      break;

    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, sortBy] = useState(SortType.NONE);
  const [isReversed, reverseArray] = useState(false);
  const [isReset, resetVisible] = useState(false);

  const visibleGoods
    = getReorderedGoods(goodsFromServer, { sortType, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            `button is-info ${(sortType === SortType.ALPHABET) ? '' : 'is-light'}`
          }
          onClick={() => {
            sortBy(SortType.ALPHABET);
            resetVisible(true);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            `button is-success ${(sortType === SortType.LENGTH) ? '' : 'is-light'}`
          }
          onClick={() => {
            sortBy(SortType.LENGTH);
            resetVisible(true);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            `button is-warning ${(isReversed) ? '' : 'is-light'}`
          }
          onClick={() => {
            reverseArray(!isReversed);
            resetVisible(!isReversed || sortType !== SortType.NONE);
          }}
        >
          Reverse
        </button>

        {isReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              reverseArray(false);
              resetVisible(false);
              sortBy(SortType.NONE);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
