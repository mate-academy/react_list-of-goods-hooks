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

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
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

  return isReversed
    ? visibleGoods.reverse()
    : visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const alphabet = () => setSortType(() => SortType.ALPHABET);

  const length = () => setSortType(() => SortType.LENGTH);

  const reverse = () => setReversed(() => !isReversed);

  const reset = () => {
    setReversed(false);
    setSortType(SortType.NONE);
  };

  const goods = getReorderedGoods(goodsFromServer, sortType, isReversed);

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
          onClick={alphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-info',
            {
              'button is-info is-light': sortType !== SortType.LENGTH,
            },
          )}
          onClick={length}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-info',
            {
              'button is-info is-light': isReversed === false,
            },
          )}
          onClick={reverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed !== false) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <div className="is-flex is-justify-content-center">
        <div className="has-text-centered">
          {goods.map((good) => {
            return (
              <div>
                <div
                  data-cy="Good"
                  key={good}
                  className="box column is-info is-rounded mb-3"
                >
                  {good}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
