import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { Button } from './components';

export const goodsFromServer: string[] = [
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

// Use this function in the render to prepare goods
export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  if (sortType !== SortType.NONE) {
    visibleGoods.sort((firstItem, nextItem) => {
      switch (sortType) {
        case SortType.ALPABET:
          return firstItem.localeCompare(nextItem);
        case SortType.LENGTH:
          return firstItem.length - nextItem.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReverse] = useState(false);
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);

  const goods = getReorderedGoods(goodsFromServer, {
    sortType,
    isReversed,
  });

  const updateSort = (type: SortType) => {
    setSortType(type);
  };

  const updateIsReverse = (reversed: boolean) => {
    setIsReverse(reversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <Button
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SortType.ALPABET,
          })}
          onClick={() => {
            updateSort(SortType.ALPABET);
          }}
        >
          Sort alphabetically
        </Button>

        <Button
          className={classNames('button', 'is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={() => {
            updateSort(SortType.LENGTH);
          }}
        >
          Sort by length
        </Button>

        <Button
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => updateIsReverse(!isReversed)}
        >
          Reverse
        </Button>

        {(isReversed || sortType !== SortType.NONE) && (
          <Button
            className="button is-danger is-light"
            onClick={() => {
              updateIsReverse(false);
              updateSort(SortType.NONE);
            }}
          >
            Reset
          </Button>
        )}
      </div>

      <ul>
        {goods.map(item => (
          <li data-cy="Good" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
