import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

import { Good } from './Good';
import goodsFromServer from './api/goods';

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

  visibleGoods.sort((prev, curr) => {
    switch (sortType) {
      case (SortType.ALPHABET):
        return prev.localeCompare(curr);

      case (SortType.LENGTH):
        return prev.length - curr.length;

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
  const [sortType, setType] = useState(SortType.NONE);
  const [isReversed, setReverse] = useState(false);

  const goods = getReorderedGoods(goodsFromServer, { sortType, isReversed });
  const showResetButton = (sortType !== SortType.NONE || isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            {
              'is-light': sortType !== SortType.ALPHABET,
            },
          )}
          onClick={() => setType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
          onClick={() => setType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            {
              'is-light': !isReversed,
            },
          )}
          onClick={() => setReverse(!isReversed)}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setType(SortType.NONE);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        <ul>
          {goods.map(good => (
            <Good good={good} key={uuidv4()} />))}
        </ul>
      </ul>
    </div>
  );
};
