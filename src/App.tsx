import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import classNames from 'classnames';
import './App.scss';
import { GoodsList } from './GoodList';

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

const getReorderedGoods = (
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) => {
  const visibleGoods = [...goods];

  visibleGoods.sort((g1, g2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return g1.localeCompare(g2);
      case SortType.LENGTH:
        return g1.length - g2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setReversed] = useState(false);

  const reverse = () => {
    setReversed(!isReversed);
  };

  const sortByName = () => {
    setSortType(SortType.ALPHABET);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const reset = () => {
    setReversed(false);
    setSortType(SortType.NONE);
  };

  const goodToRender
      = getReorderedGoods(goodsFromServer, sortType, isReversed);

  const wasItSorted = sortType === SortType.NONE && isReversed === false;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={sortByName}
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SortType.ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={sortByLength}
          className={classNames('button', 'is-success', {
            'is-light': sortType !== SortType.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={reverse}
          className={classNames('button', 'is-warning', {
            'is-light': isReversed === false,
          })}
        >
          Reverse
        </button>

        {!wasItSorted && (
          <button
            type="button"
            onClick={reset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={goodToRender} />
    </div>
  );
};
