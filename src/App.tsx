import React, { useState } from 'react';
import classNames from 'classnames';

import { GoodsList } from './components/GoodsList';

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

enum SortType {
  NONE = 'none',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
): string[] {
  const visibleGoods = [...goods];

  visibleGoods.sort((prevGood, currGood) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return prevGood.localeCompare(currGood);

      case SortType.LENGTH:
        return prevGood.length - currGood.length;

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
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const reverse = () => {
    setIsReversed(current => !current);
  };

  const sortByType = (type: SortType) => {
    setSortType(type);
  };

  const reset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const isResetButtonVisible = sortType !== SortType.NONE || isReversed;
  const reorderedGoods = getReorderedGoods(
    goodsFromServer, { isReversed, sortType },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info', {
              'is-light': sortType !== SortType.ALPHABET,
            },
          )}
          onClick={() => {
            sortByType(SortType.ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success', {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
          onClick={() => {
            sortByType(SortType.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning', {
              'is-light': !isReversed,
            },
          )}
          onClick={reverse}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <GoodsList goods={reorderedGoods} />
      </ul>
    </div>
  );
};
