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
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, changeSortType] = useState(SortType.NONE);
  const [isReversed, toggleReverse] = useState(false);

  const reverse = () => {
    toggleReverse(current => !current);
  };

  const handleSortingType = (type: SortType) => {
    changeSortType(type);
  };

  const resetToDefault = () => {
    changeSortType(SortType.NONE);
    toggleReverse(false);
  };

  const preparedGoods = getReorderedGoods(
    goodsFromServer,
    {
      isReversed,
      sortType,
    },
  );
  const showResetButton = sortType !== SortType.NONE || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info', { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={() => {
            handleSortingType(SortType.ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success', { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={() => {
            handleSortingType(SortType.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning', { 'is-light': !isReversed },
          )}
          onClick={reverse}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetToDefault}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {preparedGoods.map(good => (
            <li
              data-cy="Good"
              key={good}
            >
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
