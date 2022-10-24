import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

import { GoodsList } from './component/GoodsList';

type Goods = string[];

export const goodsFromServer: Goods = [
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

export const App: React.FC = () => {
  const [isReversed, setReverse] = useState(false);
  const [sortBy, chooseSort] = useState<SortType>(SortType.NONE);

  const reset = () => {
    setReverse(false);
    chooseSort(SortType.NONE);
  };

  const getReorderedGoods = (goods: Goods, sortType: SortType) => {
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
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            {
              'is-light': sortBy !== SortType.ALPABET,
            },
          )}
          onClick={() => chooseSort(SortType.ALPABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-success',
            {
              'is-light': sortBy !== SortType.LENGTH,
            },
          )}
          onClick={() => chooseSort(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-warning',
            {
              'is-light': !isReversed,
            },
          )}
          onClick={() => setReverse(current => !current)}
        >
          Reverse
        </button>

        {(isReversed || sortBy !== SortType.NONE)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={reset}
            >
              Reset
            </button>
          )}
      </div>

      <GoodsList
        goodsList={getReorderedGoods(goodsFromServer, sortBy)}
      />
    </div>
  );
};
