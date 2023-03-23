import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { ListOfGoods } from './ListOfGoods';

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

export function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((prev, curr) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return prev.localeCompare(curr);
      case SortType.LENGTH:
        return prev.length - curr.length;
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
  const [sortType, sortByType] = useState(SortType.NONE);
  const [isReversed, setReverse] = useState(false);

  const sortByAlphabet = () => {
    sortByType(SortType.ALPHABET);
  };

  const sortByLength = () => {
    sortByType(SortType.LENGTH);
  };

  const reverse = () => {
    setReverse(!isReversed);
  };

  const reset = () => {
    sortByType(SortType.NONE);
    setReverse(false);
  };

  const reorderedGoods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  return (
    <>
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={classNames(
              'button is-info',
              { 'is-light': sortType !== SortType.ALPHABET },
            )}
            onClick={sortByAlphabet}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={classNames(
              'button is-success',
              { 'is-light': sortType !== SortType.LENGTH },
            )}
            onClick={sortByLength}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={classNames(
              'button is-warning',
              { 'is-light': isReversed === false },
            )}
            onClick={reverse}
          >
            Reverse
          </button>

          {(sortType !== SortType.NONE || isReversed)
            && (
              <button
                type="button"
                className="button is-danger is-light"
                onClick={reset}
              >
                Reset
              </button>
            )}
        </div>

        <ListOfGoods goods={reorderedGoods} />
      </div>
    </>
  );
};
