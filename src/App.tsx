import { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

import GoodsList from './components/GoodsList/GoodsList';

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

// Use this function in the render method to prepare goods
export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  // Sort and reverse goods if needed
  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  if (sortType !== 0) { // Check if sortType is not default 0 (NONE value)
    if (sortType === 1) { // sortType[1] === ALPHABET
      visibleGoods.sort(
        (goodOne, goodAnother) => goodOne.localeCompare(goodAnother),
      );
    } else { // sortType[2] === LENGTH
      visibleGoods.sort(
        (goodOne, goodAnother) => goodOne.length - goodAnother.length,
      );
    }
  }

  return !isReversed
    ? visibleGoods
    : visibleGoods.reverse();
}

export const App = () => {
  const [isRev, setIsRev] = useState(false);
  const [sortBy, setSortBy] = useState<SortType>(SortType.NONE);
  const [goodsList, setGoodsList] = useState<string[]>();

  const options = {
    sortType: sortBy,
    isReversed: isRev,
  };

  useEffect(() => {
    const reorderedGoods = getReorderedGoods(
      goodsFromServer,
      options,
    );

    setGoodsList(reorderedGoods);
  }, [goodsList]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            classNames('button', 'is-info', { 'is-light': sortBy !== 1 })
          }
          onClick={() => setSortBy(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            classNames('button', 'is-success', { 'is-light': sortBy !== 2 })
          }
          onClick={() => setSortBy(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            classNames('button', 'is-warning', { 'is-light': !isRev })
          }
          onClick={() => setIsRev((prevIsRev) => !prevIsRev)}
        >
          Reverse
        </button>

        {(isRev || sortBy !== 0)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortBy(SortType.NONE);
                setIsRev(false);
              }}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        <GoodsList goods={getReorderedGoods(
          goodsFromServer,
          options,
        )}
        />
      </ul>
    </div>
  );
};
