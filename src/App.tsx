import React, { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

import { List } from './components/List';
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
  NONE = 'none',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

interface ReorderOptions {
  sortType: SortType,
  isReversed: boolean,
}

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
): string[] {
  const visibleGoods = [...goods];

  visibleGoods.sort((curGood, nextGood) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return curGood.localeCompare(nextGood);

      case SortType.LENGTH:
        return curGood.length - nextGood.length;

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
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const reverseOrder = () => {
    setIsReversed(curState => !curState);
  };

  const resetSorting = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  const isReordered = sortType !== SortType.NONE || isReversed;
  const reorderedGoods = getReorderedGoods(
    goodsFromServer,
    { isReversed, sortType },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <Button
          name="Sort alphabetically"
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={() => {
            setSortType(SortType.ALPHABET);
          }}
        />

        <Button
          name="Sort by length"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={() => {
            setSortType(SortType.LENGTH);
          }}
        />

        <Button
          name="Reverse"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={reverseOrder}
        />

        {isReordered && (
          <Button
            name="Reset"
            className="button is-danger is-light"
            onClick={resetSorting}
          />
        )}
      </div>

      <List goods={reorderedGoods} />
    </div>
  );
};
