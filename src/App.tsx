import React, { useState } from 'react';
import classNames from 'classnames';
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

enum SortType {
  NONE,
  ALPABET,
  LENGTH,
}

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((prevGood, currentGood) => {
    switch (sortType) {
      case SortType.ALPABET:
        return prevGood.localeCompare(currentGood);

      case SortType.LENGTH:
        return prevGood.length - currentGood.length;

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
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const handleReset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  const handleSortByAlphabet = () => {
    setSortType(SortType.ALPABET);
  };

  const handleReverse = () => {
    setIsReversed(value => (
      !value
    ));
  };

  const handleSortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const visibleGoods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.ALPABET },
          )}
          onClick={handleSortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-warning',
            { 'is-light': isReversed !== true },
          )}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isReversed === false && sortType === SortType.NONE
          ? ''
          : (
            <button
              type="button"
              className={
                classNames(
                  'button',
                  'is-danger',
                  'is-light',
                )
              }
              onClick={handleReset}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
