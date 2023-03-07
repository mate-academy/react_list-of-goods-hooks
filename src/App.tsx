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

  if (sortType !== SortType.NONE) {
    visibleGoods.sort((good1, good2) => {
      if (sortType === SortType.LENGTH) {
        return good1.length - good2.length;
      }

      return good1.localeCompare(good2);
    });
  }

  if (isReversed) {
    return visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setReversed] = useState(false);

  const handleSortType = (type: SortType) => () => {
    setSortType(type);
  };

  const reverse = () => {
    setReversed(r => !r);
  };

  const handleResetToDefault = () => {
    setSortType(SortType.NONE);
    setReversed(false);
  };

  const goods = getReorderedGoods(
    goodsFromServer,
    { isReversed, sortType },
  );

  const visibleResetButton = sortType !== SortType.NONE || isReversed;

  return (
    <div
      className="
        section
        content
      "
    >
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={handleSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={handleSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={reverse}
        >
          Reverse
        </button>

        {visibleResetButton && (
          <button
            type="button"
            className="button
              is-danger
              is-light
            "
            onClick={handleResetToDefault}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goods.map(good => (
            <li
              key={good}
              data-cy="Good"
            >
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
