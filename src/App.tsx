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

function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.LENGTH:
        return good1.length - good2.length;

      case SortType.ALPHABET:
        return good1.localeCompare(good2);

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
  const [isReversed, setIsReserved] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const visibleGoods = getReorderedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );

  const isChangedList = isReversed || sortType !== SortType.NONE;

  const handleReset = () => {
    setIsReserved(false);
    setSortType(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            classNames(
              'button',
              'is-info',
              { 'is-light': sortType !== SortType.ALPHABET },
            )
          }
          onClick={() => {
            setSortType(SortType.ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            classNames(
              'button',
              'is-success',
              { 'is-light': sortType !== SortType.LENGTH },
            )
          }
          onClick={() => {
            setSortType(SortType.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            classNames(
              'button',
              'is-warning',
              { 'is-light': !isReversed },
            )
          }
          onClick={() => {
            setIsReserved(!isReversed);
          }}
        >
          Reverse
        </button>

        {isChangedList && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
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
