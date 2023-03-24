import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { ListOfGoods } from './ListOfGoods';

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
  ALPHABET = 'ALPHABET',
  LENGTH = 'LENGTH',
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

  visibleGoods.sort((prev: string, next:string) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return prev.localeCompare(next);
      case SortType.LENGTH:
        return prev.length - next.length;
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

  const sortByAlphabet = () => {
    setSortType(SortType.ALPHABET);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const reverseList = () => {
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  const isResetAvailable = isReversed || sortType !== SortType.NONE;
  const visibleGoods = getReorderedGoods(goodsFromServer,
    { sortType, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            {
              'is-light': sortType !== SortType.ALPHABET,
            },
          )}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            {
              'is-light': !isReversed,
            },
          )}
          onClick={reverseList}
        >
          Reverse
        </button>

        {isResetAvailable && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ListOfGoods goods={visibleGoods} />
    </div>
  );
};
