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

export function getReorderedGoods(
  goods: string[],
  isReversed: boolean,
  sortType: SortType,
): string[] {
  const visibleGoods = [...goods];

  visibleGoods.sort((itemPrev, itemCurr) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return itemPrev.localeCompare(itemCurr);
      case SortType.LENGTH:
        return itemPrev.length - itemCurr.length;
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
  const [isReversed, setReverse] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const visibleGoods = getReorderedGoods(goodsFromServer, isReversed, sortType);
  const isReordered = isReversed || sortType !== SortType.NONE;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setReverse(!isReversed)}
        >
          Reverse
        </button>

        {
          (isReordered) && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => [setReverse(false), setSortType(SortType.NONE)]}
            >
              Reset
            </button>
          )
        }
      </div>

      <ListOfGoods visibleGoods={visibleGoods} />
    </div>
  );
};
