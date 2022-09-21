import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classnames from 'classnames';
import { GoodsList } from './GoodsList';

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

const getReorderedGoods = (
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) => {
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  visibleGoods.sort((a:string, b: string): number => {
    switch (sortType) {
      case SortType.ALPABET:
        return a.localeCompare(b);
      case SortType.LENGTH:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
};

export const App: React.FC = () => {
  const [isReversed, setReverse] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const reverse = () => {
    setReverse(!isReversed);
  };

  const handleSortByAlpabet = () => {
    setSortType(SortType.ALPABET);
  };

  const handleSortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const resetSortType = () => {
    setSortType(SortType.NONE);
  };

  const preparedGoods
  = getReorderedGoods(goodsFromServer, { sortType, isReversed });

  const shouldRenderResetButton = (sortType !== SortType.NONE || isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classnames(
            'button is-info', {
              'is-light': sortType !== SortType.ALPABET,
            },
          )}
          onClick={handleSortByAlpabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classnames(
            'button is-success', {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classnames(
            'button is-warning', {
              'is-light': sortType !== SortType.NONE,
            },
          )}
          onClick={reverse}
        >
          Reverse
        </button>

        {shouldRenderResetButton
        && (
          <button
            type="button"
            className={classnames(
              'button is-danger', {
                'is-light': !isReversed,
              },
            )}
            onClick={resetSortType}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <GoodsList goods={preparedGoods} />
      </ul>
    </div>
  );
};
