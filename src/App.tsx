import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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

type Reset = (
  handleSorted: (sorted: SortType) => void,
  handleReversed: (isRevers: boolean) => void,
) => void;

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

      default: return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsRevesed] = useState(false);
  const visibleGoods = getReorderedGoods(
    goodsFromServer, { sortType, isReversed },
  );

  const handleSort = (typeSort: SortType) => setSortType(typeSort);
  const handleReverse = (isRevers: boolean) => setIsRevesed(isRevers);
  const reset: Reset = (handleSorted, handleReversed) => {
    handleSorted(SortType.NONE);
    handleReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info',
            { 'is-light': sortType !== 1 })}
          onClick={() => handleSort(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success',
            { 'is-light': sortType !== 2 })}
          onClick={() => handleSort(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning',
            { 'is-light': !isReversed })}
          onClick={() => handleReverse(!isReversed)}
        >
          Reverse
        </button>

        {(sortType !== 0 || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              reset(handleSort, handleReverse);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
