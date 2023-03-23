import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import classNames from 'classnames';
import { GoodList } from './components/GoodsList';
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

export function getGoodsByDiffOrder(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((firstProduct, secondProduct) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return firstProduct.localeCompare(secondProduct);

      case SortType.LENGTH:
        return firstProduct.length - secondProduct.length;

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

  const sortByType = (typeOfSort: SortType) => {
    changeSortType(typeOfSort);
  };

  const reverseOrder = () => {
    changeIsReversed(curState => !curState);
  };

  const resetSorting = () => {
    changeIsReversed(false);
    changeSortType(SortType.NONE);
  };

  const isChanchedOrder = sortType !== SortType.NONE || isReversed;
  const reorderedProducts = getGoodsByDiffOrder(
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
            sortByType(SortType.ALPHABET);
          }}
        />

        <Button
          name="Sort by length"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={() => {
            sortByType(SortType.LENGTH);
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

        {isChanchedOrder && (
          <Button
            name="Reset"
            className="button is-danger is-light"
            onClick={resetSorting}
          />
        )}
      </div>

      <GoodList goods={reorderedProducts} />
    </div>
  );
};
