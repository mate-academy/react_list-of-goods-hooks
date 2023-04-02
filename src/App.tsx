import { useState } from 'react';
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
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);

  const options = {
    sortType,
    isReversed,
  };

  const handleSort = (sortByProp: SortType) => () => setSortType(sortByProp);

  const handleSortAlphabeticaly = handleSort(SortType.ALPHABET);

  const handleSortByLength = handleSort(SortType.LENGTH);

  const handleReverse = () => setIsReversed((previousValue) => !previousValue);

  const handleReset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const reordered = isReversed || sortType !== SortType.NONE;

  const goodsToRender = getReorderedGoods(
    goodsFromServer,
    options,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            classNames('button', 'is-info',
              { 'is-light': sortType !== SortType.ALPHABET })
          }
          onClick={handleSortAlphabeticaly}
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

        {reordered && (
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
        <GoodsList goods={goodsToRender} />
      </ul>
    </div>
  );
};
