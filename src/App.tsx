import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import classNames from 'classnames';

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

export enum SortType {
  SORT_BY_ALPHABET = 'Sort alphabetically',
  SORT_BY_LENGTH = 'Sort by length',
}

export interface Change {
  sortBy: SortType | null;
  isReversed: boolean;
}

const sortByAlphabet = (isReversed: boolean, good1: string, good2: string) =>
  isReversed ? good2.localeCompare(good1) : good1.localeCompare(good2);

function getSortedGoods(goods: string[], { sortBy, isReversed }: Change) {
  const updateGoods = [...goods];

  if (!sortBy && isReversed) {
    return updateGoods.reverse();
  }

  if (sortBy) {
    return updateGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SortType.SORT_BY_ALPHABET:
          return sortByAlphabet(isReversed, good1, good2);

        case SortType.SORT_BY_LENGTH:
          if (good1.length === good2.length) {
            return sortByAlphabet(isReversed, good1, good2);
          }

          return isReversed
            ? good2.length - good1.length
            : good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return updateGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType | null>(null);
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = getSortedGoods(goodsFromServer, { sortBy, isReversed });

  const toggleReverse = () => setIsReversed(prevIsReversed => !prevIsReversed);

  const reset = () => {
    setSortBy(null);
    setIsReversed(false);
  };

  const isActivButton = (
    stateValue: SortType | null | boolean,
    activeCondition: SortType | boolean,
  ) => (activeCondition !== stateValue ? 'is-light' : '');

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortBy(SortType.SORT_BY_ALPHABET)}
          className={classNames(
            'button',
            'is-info',
            isActivButton(sortBy, SortType.SORT_BY_ALPHABET),
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortBy(SortType.SORT_BY_LENGTH)}
          className={classNames(
            'button',
            'is-success',
            isActivButton(sortBy, SortType.SORT_BY_LENGTH),
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={toggleReverse}
          className={classNames(
            'button',
            'is-warning',
            isActivButton(isReversed, true),
          )}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
          <button
            type="button"
            onClick={reset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
