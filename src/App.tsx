import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { getReorderedGoods } from './helpers/helpers';

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

export const App: React.FC = () => {
  const [reversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const reverseGoods = () => {
    setReversed(currentOrder => !currentOrder);
  };

  const sortGoodsAlphabetic = () => {
    setSortType(SortType.ALPHABET);
  };

  const sortGoodsByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const reset = () => {
    setReversed(false);
    setSortType(SortType.NONE);
  };

  const resetButtonCondition = reversed || sortType !== SortType.NONE;
  const reorderedGoods = getReorderedGoods(goodsFromServer, reversed, sortType);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info', {
              'is-light': sortType !== SortType.ALPHABET,
            },
          )}
          onClick={sortGoodsAlphabetic}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success', {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
          onClick={sortGoodsByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning', {
              'is-light': !reversed,
            },
          )}
          onClick={reverseGoods}
        >
          Reverse
        </button>
        {resetButtonCondition && (
          <button
            type="button"
            className="button is-danger"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {reorderedGoods.map(good => (
            <li data-cy="Good">{good}</li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
