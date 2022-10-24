import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

import { Button } from './components/Button';
import { GoodsList } from './components/GoodsList';

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

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((item1, item2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return item1.localeCompare(item2);
      case SortType.LENGTH:
        return item1.length - item2.length;
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
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);

  const goods = getReorderedGoods(goodsFromServer, { isReversed, sortType });

  const sortBy = (parameter: SortType) => {
    setSortType(parameter);
  };

  const reverse = () => {
    setReversed(!isReversed);
  };

  const reset = () => {
    setSortType(SortType.NONE);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <Button
          className={
            classNames('is-info', {
              'is-light': sortType !== SortType.ALPHABET,
            })
          }
          onClick={() => sortBy(SortType.ALPHABET)}
        >
          Sort alphabetically
        </Button>

        <Button
          className={
            classNames('is-success', {
              'is-light': sortType !== SortType.LENGTH,
            })
          }
          onClick={() => sortBy(SortType.LENGTH)}
        >
          Sort by length
        </Button>

        <Button
          className={
            classNames('is-warning', {
              'is-light': isReversed === false,
            })
          }
          onClick={reverse}
        >
          Reverse
        </Button>

        {(sortType !== SortType.NONE || isReversed !== false) && (
          <Button
            className="is-danger is-light"
            onClick={reset}
          >
            Reset
          </Button>
        )}
      </div>

      <GoodsList reorderdGoods={goods} />
    </div>
  );
};
