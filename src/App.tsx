import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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

  if (sortType === SortType.LENGTH) {
    visibleGoods.sort((item1, item2) => item1.length - item2.length);
  }

  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort();
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

// eslint-disable-next-line react/prefer-stateless-function
export const App: React.FC = () => {
  const [isReversed, setReverse] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const reverseList = () => {
    setReverse(!isReversed);
  };

  const sortByLength = () => {
    // this.setState({ sortType: SortType.LENGTH });
    setSortType(SortType.LENGTH);
  };

  const sortByAlphabet = () => {
    // this.setState({ sortType: SortType.ALPHABET });
    setSortType(SortType.ALPHABET);
  };

  const resetToDefault = () => {
    // this.setState({
    //   isReversed: false,
    //   sortType: SortType.NONE,
    // });
    setReverse(false);
    setSortType(SortType.NONE);
  };

  const goods = getReorderedGoods(goodsFromServer, { sortType, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortType !== SortType.ALPHABET },
          )}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortType !== SortType.LENGTH },
          )}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={reverseList}
        >
          Reverse
        </button>

        {(isReversed || sortType !== SortType.NONE)
        && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetToDefault}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goods.map(goodItem => (
            <li
              key={goodItem}
              data-cy="Good"
            >
              {goodItem}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
