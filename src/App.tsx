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

  if (isReversed) {
    return visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const sortedGoods = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );

  const handelSortAlphabetically = () => {
    setSortType(SortType.ALPHABET);
  };

  const handelSortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const handelReverse = () => {
    setIsReversed(!isReversed);
  };

  const handelReset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info is-large',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={handelSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success is-large',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={handelSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning is-large',
            { 'is-light': !isReversed },
          )}
          onClick={handelReverse}
        >
          Reverse
        </button>

        {(isReversed || sortType !== SortType.NONE)
          ? (
            <button
              type="button"
              className="button is-danger is-large is-light"
              onClick={handelReset}
            >
              Reset
            </button>
          )
          : null}
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
