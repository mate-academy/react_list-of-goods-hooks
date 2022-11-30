import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { ListOfGoods } from './components/ListOfGoods';

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
  goods:string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((el1, el2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return el1.localeCompare(el2);

      case SortType.LENGTH:
        return el1.length - el2.length;

      case SortType.NONE:
      default:
        return 0;
    }
  });

  return isReversed
    ? visibleGoods.reverse()
    : visibleGoods;
}

export const App: React.FC = () => {
  const [value] = useState(goodsFromServer);
  const [isReversed, setisReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const visibleGoods = getReorderedGoods(value, { sortType, isReversed });

  const isOriginalOrder = (sortType === SortType.NONE) && !isReversed;

  const sortByALPHABET = () => setSortType(SortType.ALPHABET);

  const sortByLength = () => setSortType(SortType.LENGTH);

  const reverseList = () => setisReversed(!isReversed);

  const reset = () => {
    setisReversed(false);
    setSortType(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info', { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={sortByALPHABET}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success', { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning', { 'is-light': !isReversed },
          )}
          onClick={reverseList}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            className={classNames(
              'button is-danger', { 'is-light': isOriginalOrder },
            )}
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ListOfGoods goods={visibleGoods} />
    </div>
  );
};
