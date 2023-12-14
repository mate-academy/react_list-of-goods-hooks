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
  LENGTH = 'length',
  ALPHABETICAL = 'alphabetical',
  NONE = '',
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(goods: string[],
  { sortType, isReversed }: ReorderOptions) {
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABETICAL:
      visibleGoods.sort((a: string, b: string) => {
        if (a < b) {
          return -1;
        }

        if (a > b) {
          return 1;
        }

        return 0;
      });
      break;

    case SortType.LENGTH:
      visibleGoods.sort((a: string, b: string) => {
        if (a.length < b.length) {
          return -1;
        }

        if (a.length > b.length) {
          return 1;
        }

        return 0;
      });
      break;

    default:
      break;
  }

  return isReversed ? visibleGoods.reverse() : visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const goods = getReorderedGoods(goodsFromServer, { sortType, isReversed });

  const sortAlphabetically = () => {
    setSortType(SortType.ALPHABETICAL);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={sortType === 'alphabetical'
            ? 'button is-info'
            : 'button is-info is-light'}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={sortType === 'length'
            ? 'button is-success'
            : 'button is-success is-light'}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={isReversed
            ? 'button is-warning'
            : 'button is-warning is-light'}
          onClick={reverse}
        >
          Reverse
        </button>

        {sortType !== '' || isReversed
          ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={reset}
            >
              Reset
            </button>
          )
          : null}

      </div>
      <ul>
        <ul>
          {goods.map(item => (
            <li data-cy="Good">{item}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
