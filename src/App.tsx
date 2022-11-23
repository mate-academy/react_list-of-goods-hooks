import React, { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsList } from './components/GoodsList';

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
  NONE = 'NONE',
  ALPABET = 'ALPHABET',
  LENGTH = 'LENGTH',
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

  visibleGoods.sort((goodOne, goodTwo) => {
    switch (sortType) {
      case SortType.ALPABET:
        return goodOne.localeCompare(goodTwo);
      case SortType.LENGTH:
        return goodOne.length - goodTwo.length;
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

  const allGoods = getReorderedGoods(
    goodsFromServer, { sortType, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info',
            {
              'is-light': sortType !== SortType.ALPABET,
            })}
          onClick={() => setSortType(SortType.ALPABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success',
            {
              'is-light': sortType !== SortType.LENGTH,
            })}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning',
            {
              'is-light': !isReversed,
            })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>
        {isReversed || sortType !== SortType.NONE
          ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setIsReversed(false);
                setSortType(SortType.NONE);
              }}
            >
              Reset
            </button>
          )
          : null}

      </div>

      <ul>
        <GoodsList goods={allGoods} />
      </ul>
    </div>
  );
};
