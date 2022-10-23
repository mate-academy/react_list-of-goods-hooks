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
  ALPABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [reversed, setReversed] = useState(false);

  const getReorderedGoods = (
    goods: string[],
    { sortType: sortBy, isReversed }: ReorderOptions,
  ) => {
    const visibleGoods = [...goods];

    switch (sortBy) {
      case SortType.ALPABET:
        visibleGoods.sort((g1, g2) => g1.localeCompare(g2));
        break;

      case SortType.LENGTH:
        visibleGoods.sort((g1, g2) => g1.length - g2.length);
        break;

      default:
        break;
    }

    if (isReversed) {
      visibleGoods.reverse();
    }

    return visibleGoods;
  };

  const resetData = () => {
    setSortType(SortType.NONE);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            {
              'is-light': sortType !== SortType.ALPABET,
            },
          )}
          onClick={() => setSortType(SortType.ALPABET)}
        >
          Sort alphabetically
        </button>

        <button
          className={classNames(
            'button',
            'is-success',
            {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
          type="button"
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-warning',
            {
              'is-light': !reversed,
            },
          )}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(
          reversed || sortType !== SortType.NONE
        ) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetData}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {getReorderedGoods(
            goodsFromServer, { sortType, isReversed: reversed },
          )
            .map((product) => (
              <li data-cy="Good" key={product}>
                {product}
              </li>
            ))}
        </ul>
      </ul>
    </div>
  );
};
