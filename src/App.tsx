import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './GoodList';
import classNames from 'classnames';
// import classNames from 'classnames';

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
  ALPABET,
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

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.ALPABET:
        return good1.localeCompare(good2);

      case SortType.LENGTH:
        return good1.length - good2.length;

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
  const [sortType, handleSortType] = useState(SortType.NONE);
  const [isReversed, handleReverse] = useState(false);
  const sortByAlphabet = () => handleSortType(SortType.ALPABET);
  const sortByLength = () => handleSortType(SortType.LENGTH);
  const reverse = () => handleReverse(!isReversed);
  const reset = () => {
    handleSortType(SortType.NONE);
    handleReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            {
              'is-light': sortType !== SortType.ALPABET,
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
              'is-light': isReversed === false,
            },
          )}
          onClick={reverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed === true) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>
      <GoodList goods={getReorderedGoods(
        goodsFromServer,
        ({
          sortType,
          isReversed,
        }),
      )}
      />
    </div>
  );
};
