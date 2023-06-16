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

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return good1.localeCompare(good2);

      case SortType.LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  return isReversed
    ? visibleGoods.reverse()
    : visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReverse] = useState(false);
  const [sortType, setSort] = useState(SortType.NONE);

  const goods = getReorderedGoods(
    goodsFromServer, { isReversed, sortType },
  );

  const isSortingApplied = sortType !== SortType.NONE || isReversed;

  function reset() {
    setSort(SortType.NONE);
    setReverse(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'section__button section__button--alphabet is-info', {
              'is-light generalButton': sortType !== SortType.ALPHABET,
            },
          )}
          onClick={() => setSort(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'section__button section__button--length is-success', {
              'is-light generalButton': sortType !== SortType.LENGTH,
            },
          )}
          onClick={() => setSort(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'section__button section__button--reverse is-warning', {
              'is-light generalButton': !isReversed,
            },
          )}
          onClick={() => setReverse(!isReversed)}
        >
          Reverse
        </button>

        {isSortingApplied && (
          <button
            type="button"
            className="
              section__button
              section__button--reset
              is-danger
              is-light
            "
            onClick={() => reset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
