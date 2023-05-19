import React, { useState } from 'react';
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
  NONE,
  ALPHABET,
  LENGTH,
}

interface ReorderOptions {
  sortType: SortType,
  isReversed: boolean,
}

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABET: {
      visibleGoods.sort((firstGood, secondGood) => {
        return firstGood.localeCompare(secondGood);
      });
      break;
    }

    case SortType.LENGTH: {
      visibleGoods.sort((firstGood, secondGood) => {
        return firstGood.length - secondGood.length;
      });
      break;
    }

    case SortType.NONE: {
      break;
    }

    default: {
      throw new Error('invalid sortType key');
    }
  }

  return isReversed ? visibleGoods.reverse() : visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const reverseGoods = () => {
    setIsReversed(!isReversed);
  };

  const sortGoodsAlphabetically = () => {
    setSortType(SortType.ALPHABET);
  };

  const sortGoodsByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const resetGoodsOrder = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  const wasListMutated = isReversed || sortType !== SortType.NONE;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== SortType.ALPHABET && 'is-light'}`}
          onClick={sortGoodsAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== SortType.LENGTH && 'is-light'}`}
          onClick={sortGoodsByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed && 'is-light'}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {
          wasListMutated
            && (
              <button
                type="button"
                className="button is-danger is-light"
                onClick={resetGoodsOrder}
              >
                Reset
              </button>
            )
        }
      </div>

      <ul>
        <ul>
          { getReorderedGoods(goodsFromServer, { sortType, isReversed })
            .map(good => (
              <li data-cy="Good" key={good}>{good}</li>
            ))}
        </ul>
      </ul>
    </div>
  );
};
