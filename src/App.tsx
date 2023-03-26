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

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort(
    (prevGood, nextGood) => {
      switch (sortType) {
        case SortType.LENGTH:
          return prevGood.length - nextGood.length;
        case SortType.ALPHABET:
          return prevGood.localeCompare(nextGood);
        default:
          return 0;
      }
    },
  );

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

  const handleSort = (sortByProp: SortType) => () => setSortBy(sortByProp);

  const handleSortAlphabeticaly = handleSort(SortType.ALPHABET);

  const handleSortByLength = handleSort(SortType.LENGTH);

  const handleReverse = () => setIsRev((prevIsRev) => !prevIsRev);

  const handleReset = () => {
    setSortBy(SortType.NONE);
    setIsRev(false);
  };

  const reordered = isRev || sortBy !== 0;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            classNames('button', 'is-info',
              { 'is-light': sortBy !== SortType.ALPHABET })
          }
          onClick={() => handleSortAlphabeticaly()}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            classNames('button', 'is-success',
              { 'is-light': sortBy !== SortType.LENGTH })
          }
          onClick={() => handleSortByLength()}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            classNames('button', 'is-warning',
              { 'is-light': !isRev })
          }
          onClick={() => handleReverse()}
        >
          Reverse
        </button>

        {reordered && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleReset()}
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
