import React, { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

import { GoodsList } from './components/GoodsList';
import { Button } from './components/Button';

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

  visibleGoods.sort((g1, g2) => {
    switch (sortType) {
      case SortType.LENGTH:
        return g1.length - g2.length;

      case SortType.ALPHABET:
        return g1.localeCompare(g2);

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
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const reverse = () => {
    setIsReversed(status => (!status));
  };

  const reset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const reorderedGoods = getReorderedGoods(goodsFromServer, {
    sortType,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <Button
          onClick={() => setSortType(SortType.LENGTH)}
          className={
            classNames('is-success', {
              'is-light': sortType !== SortType.LENGTH,
            })
          }
        >
          Sort by length
        </Button>

        <Button
          onClick={() => setSortType(SortType.ALPHABET)}
          className={
            classNames('is-info', {
              'is-light': sortType !== SortType.ALPHABET,
            })
          }
        >
          Sort alphabetically
        </Button>

        <Button
          onClick={reverse}
          className={
            classNames('is-warning', {
              'is-light': !isReversed,
            })
          }
        >
          Reverse
        </Button>

        {(sortType !== SortType.NONE || isReversed) && (
          <Button
            onClick={reset}
            className="is-danger is-light"
          >
            Reset
          </Button>
        )}
      </div>

      <GoodsList reorderedGoods={reorderedGoods} />
    </div>
  );
};
