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
  NONE = 0,
  ALPHABET = 1,
  LENGTH = 2,
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

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort(
        (prevGood, currGood) => prevGood.localeCompare(currGood),
      );
      break;

    case SortType.LENGTH:
      visibleGoods.sort(
        (prevGood, currGood) => prevGood.length - currGood.length,
      );
      break;

    default:
      break;
  }

  return isReversed
    ? visibleGoods.reverse()
    : visibleGoods;
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

  const showResetButton = sortType !== SortType.NONE || isReversed;
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

        {showResetButton && (
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
