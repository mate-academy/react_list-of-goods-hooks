import React, { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsList } from './components/GoodList';

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

type Goods = string[];

enum SortType {
  Length = 'length',
  Alphabet = 'alphabet',
  None = '',
}

function sortPreparedGoods(
  arr: Goods,
  sortBy: SortType,
  isReverse: boolean,
) {
  const preparedGoodsList = [...arr];

  switch (sortBy) {
    case SortType.Length:
      preparedGoodsList.sort((a, b) => a.length - b.length);
      break;

    case SortType.Alphabet:
      preparedGoodsList.sort((a, b) => a.localeCompare(b));
      break;

    default:
  }

  if (isReverse) {
    preparedGoodsList.reverse();
  }

  return preparedGoodsList;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortType.None);
  const [isReverse, setIsReverse] = useState(false);

  const preparedGoodsList = sortPreparedGoods(
    goodsFromServer,
    sortBy,
    isReverse,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortBy !== SortType.Alphabet },
          )}
          onClick={() => setSortBy(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortBy !== SortType.Length },
          )}
          onClick={() => setSortBy(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReverse },
          )}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {(sortBy || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsReverse(false);
              setSortBy(SortType.None);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={preparedGoodsList} />
    </div>
  );
};
