import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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

type ReoderOptions = {
  isReversed: boolean,
  sortType: SortType,
};

export function reoderGoods(
  goods: string[],
  { sortType, isReversed } :ReoderOptions,
) {
  const visibleList = [...goods];

  visibleList.sort((item1, item2) => {
    switch (sortType) {
      case SortType.ALPHABET: return item1.localeCompare(item2);
      case SortType.LENGTH: return item1.length - item2.length;
      default: return 0;
    }
  });

  if (isReversed) {
    visibleList.reverse();
  }

  return visibleList;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const sortByAlphabet = () => {
    setSortType(SortType.ALPHABET);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  const items = reoderGoods(goodsFromServer, { isReversed, sortType });

  return (
    <div className="section content">
      <div className="buttons">

        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {items.map(item => {
          return (
            <li key={item}>{item}</li>
          );
        })}
      </ul>
    </div>
  );
};
