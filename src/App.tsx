import React, { useState } from 'react';
import classNames from 'classnames';
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

export const App: React.FC = () => {
  const copyGoods = [...goodsFromServer];
  const [sortType, setsortType] = useState(SortType.NONE);
  const [isReversed, setReversed] = useState(false);

  const getReorderedGoods = (goods: string[]) => {
    goods.sort((g1, g2) => {
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
      goods.reverse();
    }

    return goods;
  };

  const sortAlphabetically = () => {
    setsortType(SortType.ALPHABET);
  };

  const sortByLength = () => {
    setsortType(SortType.LENGTH);
  };

  let visibleGoods = getReorderedGoods(copyGoods);

  const reverce = () => {
    setReversed(!isReversed);
  };

  const reset = () => {
    setsortType(SortType.NONE);
    setReversed(false);
    visibleGoods = goodsFromServer;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            classNames(
              'button is-info',
              { 'is-light': sortType !== SortType.ALPHABET },
            )
          }
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            classNames(
              'button is-success',
              { 'is-light': sortType !== SortType.LENGTH },
            )
          }
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            classNames('button is-warning', { 'is-light': !isReversed })
          }
          onClick={reverce}
        >
          Reverse
        </button>

        {!(sortType === SortType.NONE && !isReversed)
            && (
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
        <ul>
          {visibleGoods.map(
            good => (
              <li data-cy="Good" key={good}>
                {good}
              </li>
            ),
          )}
        </ul>
      </ul>
    </div>
  );
};
