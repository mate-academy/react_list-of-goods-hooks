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

type Good = string;
type IsReversed = boolean;

enum SortBy {
  alphabet = 'alphabet',
  wordLength = 'length',
  default = '',
}

function prepareGoods(
  goods: Good[],
  sortType: SortBy,
  reverse: IsReversed,
): Good[] {
  const sortedGoods: Good[] = [...goods].sort((good1, good2) => {
    switch (sortType) {
      case SortBy.alphabet:
        return good1.localeCompare(good2);

      case SortBy.wordLength:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (reverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.default);
  const [isReversed, setIsReversed] = useState<IsReversed>(false);

  const preparedGoods = prepareGoods(goodsFromServer, sortBy, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SortBy.alphabet,
          })}
          onClick={() => {
            setSortBy(SortBy.alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SortBy.wordLength,
          })}
          onClick={() => {
            setSortBy(SortBy.wordLength);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => {
            setIsReversed(prev => !prev);
          }}
        >
          Reverse
        </button>

        {(isReversed === true || sortBy) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(SortBy.default);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {preparedGoods.map(good => {
            return (
              <li key={good} data-cy="Good">
                {good}
              </li>
            );
          })}
        </ul>
      </ul>
    </div>
  );
};
