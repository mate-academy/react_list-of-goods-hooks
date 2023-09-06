import React, { useState } from 'react';
import classnames from 'classnames';

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
  Default = '',
  Alphabet = 'alphabet',
  Length = 'length',
}
type GoodWithId = {
  product: string,
  id: number,
};

function getGoodsWithId(goods: string[]): GoodWithId[] {
  return goods.map((product, index) => ({ product, id: index + 1 }));
}

const goodsWithId = getGoodsWithId(goodsFromServer);

type SortCallback = (goodA: GoodWithId, goodB: GoodWithId) => number;
function getSortCallback(sortType: SortType): SortCallback {
  return (goodA: GoodWithId, goodB: GoodWithId) => {
    switch (sortType) {
      case SortType.Alphabet:
        return goodA.product.localeCompare(goodB.product);

      case SortType.Length:
        return goodA.product.length - goodB.product.length;

      default:
        return 0;
    }
  };
}

function getSortedGoods(
  goods: GoodWithId[],
  sortType: SortType,
  isReversed: boolean,
): GoodWithId[] {
  const goodsCopy = [...goods];

  goodsCopy.sort(getSortCallback(sortType));

  if (isReversed) {
    goodsCopy.reverse();
  }

  return goodsCopy;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);
  const sortedGoods = getSortedGoods(goodsWithId, sortType, isReversed);

  const isResetButtonVisible = Boolean(sortType) || isReversed;
  const handleResetButtonClick = (): void => {
    setSortType(SortType.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classnames(
            'button',
            'is-info',
            {
              'is-light': SortType.Alphabet !== sortType,
            },
          )}
          onClick={() => setSortType(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classnames(
            'button',
            'is-success',
            {
              'is-light': SortType.Length !== sortType,
            },
          )}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classnames(
            'button',
            'is-warning',
            {
              'is-light': !isReversed,
            },
          )}
          onClick={() => setIsReversed(() => !isReversed)}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetButtonClick}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(({ product, id }) => (
          <li data-cy="Good" key={id}>{product}</li>
        ))}
      </ul>
    </div>
  );
};
