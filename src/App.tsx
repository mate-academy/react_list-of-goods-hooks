// import React from 'react';
import { useState } from 'react';
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

type GoodsType = string[];

enum Sort {
  Default = '',
  Alphabet = 'by alphabet',
  Length = 'by length',
}

function getPreparedGoods(
  goods: GoodsType,
  sortType: string,
  isReverse: boolean,
) {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case Sort.Alphabet:
          return good1.localeCompare(good2);

        case Sort.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(Sort.Default);
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortType,
    isReverse,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info',
            {
              'is-light': sortType !== Sort.Alphabet,
            })}
          onClick={() => setSortType(Sort.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success',
            {
              'is-light': sortType !== Sort.Length,
            })}
          onClick={() => setSortType(Sort.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning',
            {
              'is-light': !isReverse,
            })}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {(sortType || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(Sort.Default);
              setIsReverse(false);
            }}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}

      </ul>
    </div>
  );
};
