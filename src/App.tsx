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
  ALPHABETICALLY,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((a, b) => {
    switch (sortType) {
      case SortType.ALPHABETICALLY:
        return a.localeCompare(b);

      case SortType.LENGTH:
        return a.length - b.length;

      case SortType.NONE:
        return 0;

      default:
        throw new Error('Error, fixed your sort method');
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [value, setValue] = useState({
    isReversed: false,
    sortType: SortType.NONE,
  });

  const sortedByAlphabetically = () => {
    setValue({ ...value, sortType: SortType.ALPHABETICALLY });
  };

  const sortedByLength = () => {
    setValue({ ...value, sortType: SortType.LENGTH });
  };

  const reverse = () => {
    setValue({ ...value, isReversed: !value.isReversed });
  };

  const reset = () => {
    setValue({ sortType: SortType.NONE, isReversed: false });
  };

  const preparedList = getReorderedGoods(
    goodsFromServer,
    value,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            { 'is-light': value.sortType !== SortType.ALPHABETICALLY },
          )}
          onClick={sortedByAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            { 'is-light': value.sortType !== SortType.LENGTH },
          )}
          onClick={sortedByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            { 'is-light': !value.isReversed },
          )}
          onClick={reverse}
        >
          Reverse
        </button>

        {(value.isReversed || value.sortType !== SortType.NONE) && (
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
        {preparedList.map(goods => (
          <li
            key={goods}
            data-cy="Good"
          >
            {goods}
          </li>
        ))}
      </ul>
    </div>
  );
};
