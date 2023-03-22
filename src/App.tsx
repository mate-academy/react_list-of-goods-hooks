import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { Goods } from './components/Goods';

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
  NONE = 'none',
  LENGTH = 'length',
  ALPHABET = 'alphabet',
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((acc, curr) => {
    switch (sortType) {
      case SortType.LENGTH:
        return acc.length - curr.length;

      case SortType.ALPHABET:
        return acc.localeCompare(curr);

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
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const isOrderChanged = (
    sortType !== SortType.NONE
    || isReversed
  );
  const reorderedGoods = getReorderGoods(
    goodsFromServer,
    { isReversed, sortType },
  );

  const resetChanges = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

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
            onClick={() => setSortType(SortType.ALPHABET)}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={classNames(
              'button is-success',
              { 'is-light': sortType !== SortType.LENGTH },
            )}
            onClick={() => setSortType(SortType.LENGTH)}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={classNames(
              'button is-warning',
              { 'is-light': !isReversed },
            )}
            onClick={() => setIsReversed(curr => !curr)}
          >
            Reverse
          </button>
          {isOrderChanged && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={resetChanges}
            >
              Reset
            </button>
          )}
        </div>
        <ul>
          <Goods goods={reorderedGoods} />
        </ul>
      </div>
    </>
  );
};
