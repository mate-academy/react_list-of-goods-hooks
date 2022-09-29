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

export enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export const getReorderedGoods = (
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) => {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SortType.LENGTH:
      visibleGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    default:
      visibleGoods.map(good => good);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  return visibleGoods;
};

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const goods = getReorderedGoods(goodsFromServer, {
    sortType,
    isReversed,
  });

  const handleSortAlphabetic = () => {
    setSortType(SortType.ALPHABET);
  };

  const handleSortLength = () => {
    setSortType(SortType.LENGTH);
  };

  const handleSortReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={handleSortAlphabetic}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'button is-success is-light': sortType !== SortType.LENGTH },
          )}
          onClick={handleSortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'button is-warning is-light': !isReversed },
          )}
          onClick={handleSortReverse}
        >
          Reverse
        </button>

        {(isReversed || !!sortType)
          && (
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
        <ul>
          {goods.map(good => (

            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
