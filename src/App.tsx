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

interface ReorderOptions {
  sortType: SortType,
  isReversed: boolean,
}

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const goodsToShow = [...goods];

  goodsToShow.sort((good1, good2) => {
    switch (sortType) {
      case SortType.LENGTH:
        return good1.length - good2.length;

      case SortType.ALPHABET:
        return good1.localeCompare(good2);

      default:
        return 0;
    }
  });

  if (isReversed) {
    goodsToShow.reverse();
  }

  return goodsToShow;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const sortByLength = () => setSortType(SortType.LENGTH);

  const sortByAlphabet = () => setSortType(SortType.ALPHABET);

  const reverse = () => setIsReversed((state) => !state);

  const reset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  const reorderedGoods = getReorderedGoods(
    goodsFromServer, { sortType, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <Button
          onClick={sortByAlphabet}
          className={
            classNames('is-info', {
              'is-light': sortType !== SortType.ALPHABET,
            })
          }
        >
          Sort alphabetically
        </Button>

        <Button
          onClick={sortByLength}
          className={
            classNames('is-success', {
              'is-light': sortType !== SortType.LENGTH,
            })
          }
        >
          Sort by length
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
