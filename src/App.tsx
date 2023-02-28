import React, { useCallback, useMemo, useState } from 'react';
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
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const getReorderedGoods = useCallback(
    (
      goods: string[],
      {
        sortType: reorderSortType,
        isReversed: reorderIsReversed,
      }: ReorderOptions,
    ) => {
      let visibleGoods = [...goods];

      switch (reorderSortType) {
        case SortType.ALPHABET:
          visibleGoods = visibleGoods
            .sort((item1, item2) => item1.localeCompare(item2));
          break;

        case SortType.LENGTH:
          visibleGoods = visibleGoods
            .sort((item1, item2) => item1.length - item2.length);
          break;

        default:
          break;
      }

      if (reorderIsReversed) {
        visibleGoods = visibleGoods.reverse();
      }

      return visibleGoods;
    },
    [sortType, isReversed],
  );

  const goods = useMemo(
    () => getReorderedGoods(goodsFromServer, { sortType, isReversed }),
    [sortType, isReversed],
  );

  const handleAlphabetSort = () => {
    setSortType(SortType.ALPHABET);
    setIsReversed(false);
  };

  const handleLengthSort = () => {
    setSortType(SortType.LENGTH);
    setIsReversed(false);
  };

  const handleReverse = () => {
    setIsReversed(prevIsReversed => !prevIsReversed);
  };

  const handleReset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
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
          onClick={handleAlphabetSort}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={handleLengthSort}
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
        {(sortType || isReversed) && (
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
        {goods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
