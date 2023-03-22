import { FC, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { Goods } from './components/goodsList';

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

  visibleGoods.sort((prevGood: string, nextGood: string) => {
    switch (sortType) {
      case SortType.LENGTH:
        return prevGood.length - nextGood.length;

      case SortType.ALPHABET:
        return prevGood.localeCompare(nextGood);

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: FC = () => {
  const [isReversed, setReverse] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const visibleGoods = getReorderedGoods(goodsFromServer, {
    isReversed,
    sortType,
  });

  const isFiltered = isReversed || sortType !== SortType.NONE;

  const handleReverse = () => {
    setReverse(!isReversed);
  };

  const handleSort = (type: SortType) => {
    setSortType(type);
  };

  const handleReset = () => {
    setReverse(false);
    setSortType(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info',
            {
              'is-light': sortType !== SortType.ALPHABET,
            })}
          onClick={() => handleSort(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success',
            {
              'is-light': sortType !== SortType.LENGTH,
            })}
          onClick={() => handleSort(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning',
            {
              'is-light': !isReversed,
            })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isFiltered && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <Goods goods={visibleGoods} />
    </div>
  );
};
