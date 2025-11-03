import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import GoodsList from './components/GoodsList';
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
  None,
  Alphabet,
  Length,
}

interface SortingOptions {
  type: SortType;
  isReverse: boolean;
}

function sortGoods(
  initialGoods: string[],
  { type, isReverse }: SortingOptions,
): string[] {
  const preparedGoods = [...initialGoods];

  preparedGoods.sort((goodA, goodB) => {
    switch (type) {
      case SortType.Alphabet:
        return goodA.localeCompare(goodB);

      case SortType.Length:
        return goodA.length - goodB.length;

      default:
        return 0;
    }
  });

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.None);
  const [isReverse, setIsReverse] = useState(false);

  const handleResetSortOptions = () => {
    setSortType(SortType.None);
    setIsReverse(false);
  };

  const goods = sortGoods(goodsFromServer, { type: sortType, isReverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== SortType.Alphabet,
          })}
          onClick={() => setSortType(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortType !== SortType.Length,
          })}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => setIsReverse(curState => !curState)}
        >
          Reverse
        </button>

        {(sortType !== SortType.None || isReverse !== false) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetSortOptions}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={goods} />
    </div>
  );
};
