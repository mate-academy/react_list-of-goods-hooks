import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import { SortType } from './Types/SortType';
import { getReorderedGoods } from './Helpers/getReorderedGoods';

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

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);

  useEffect(() => {
    const reorderGoods = getReorderedGoods(
      goodsFromServer, {
        sortType,
        isReversed,
      },
    );

    setVisibleGoods(reorderGoods);
  }, [isReversed, sortType]);

  const changeSortType = (sortBy: SortType) => {
    setSortType(sortBy);
  };

  const changeOrderBy = () => {
    setIsReversed((prev) => !prev);
  };

  const resetSort = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-warning', {
              'is-light': sortType !== SortType.ALPHABET,
            },
          )}
          onClick={() => changeSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-warning', {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
          onClick={() => changeSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-warning', {
              'is-light': !isReversed,
            },
          )}
          onClick={changeOrderBy}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSort}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
