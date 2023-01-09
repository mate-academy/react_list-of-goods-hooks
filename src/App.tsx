import React, { useState } from 'react';
import 'bulma/css/bulma.css';

import classNames from 'classnames';
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

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((good1, good2) => {
        return good1.localeCompare(good2);
      });
      break;

    case SortType.LENGTH:
      visibleGoods.sort((good1, good2) => {
        return good1.length - good2.length;
      });
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
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const handleReverse = () => {
    setReversed(current => !current);
  };

  const handleReset = () => {
    setReversed(false);
    setSortType(SortType.NONE);
  };

  const handleSortByAlphabet = () => {
    setSortType(SortType.ALPHABET);
  };

  const handleSortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const reorderedGoods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );
  const shouldAvailableButton = isReversed || sortType !== SortType.NONE;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={handleSortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {shouldAvailableButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul className="list">
        {reorderedGoods.map(good => (
          <li className="list__item" key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
