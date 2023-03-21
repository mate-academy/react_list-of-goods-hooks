import React, { useState } from 'react';
import classNames from 'classnames';
import { GoodList } from './components/GoodList';
import { Button } from './components/Button';

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

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
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
  const [isReversed, changeIsReversed] = useState(false);
  const [sortType, changeSortType] = useState(SortType.NONE);

  const handleSort = (typeOfSort: SortType) => {
    changeSortType(typeOfSort);
  };

  const reverseGoods = () => {
    changeIsReversed(curState => !curState);
  };

  const resetGoods = () => {
    changeIsReversed(false);
    changeSortType(SortType.NONE);
  };

  const checkReset = sortType !== SortType.NONE || isReversed;
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
            handleSort(SortType.ALPHABET);
          }}
        />

        <Button
          name="Sort by length"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={() => {
            handleSort(SortType.LENGTH);
          }}
        />

        <Button
          name="Reverse"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={reverseGoods}
        />

        {checkReset && (
          <Button
            name="Reset"
            className="button is-danger is-light"
            onClick={resetGoods}
          />
        )}
      </div>

      <GoodList goods={reorderedGoods} />
    </div>
  );
};
