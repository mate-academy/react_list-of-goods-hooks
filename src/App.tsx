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

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const hadnleReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleSort = (newSort: SortType) => setSortType(newSort);

  const handleReset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  function getVisibleGoods() {
    let visibleGoods = [...goodsFromServer];

    switch (sortType) {
      case SortType.ALPHABET:
        visibleGoods = visibleGoods.sort((a, b) => {
          const nameA = a.toLowerCase();
          const nameB = b.toLowerCase();

          return isReversed
            ? nameB.localeCompare(nameA)
            : nameA.localeCompare(nameB);
        });
        break;
      case SortType.LENGTH:
        visibleGoods = visibleGoods.sort((a, b) => {
          return isReversed ? b.length - a.length : a.length - b.length;
        });
        break;
      default:
        // No sorting needed
        break;
    }

    return visibleGoods;
  }

  // Assign visibleGoods directly within the component function
  const visibleGoods = getVisibleGoods();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={() => handleSort(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={() => handleSort(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={hadnleReverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
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
        {visibleGoods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
