import { useState } from 'react';
import 'bulma/css/bulma.css';
import classnames from 'classnames';

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
  noSort = '',
  byLength = 'length',
  byName = 'alphabetically',
}

const sortGoods = (
  goods: string[],
  sortType: SortType,
  isReverseGoods: boolean,
) => {
  if (sortType === SortType.noSort && !isReverseGoods) {
    return goods;
  }

  const preparedGoods = [...goods];

  if (sortType === SortType.byLength || sortType === SortType.byName) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.byLength:
          return good1.length - good2.length;
        case SortType.byName:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (isReverseGoods) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortType, setSortType] = useState(SortType.noSort);
  const [isReverseGoods, setIsReverseGoods] = useState(false);

  const sortedGoods = sortGoods(
    goodsFromServer,
    sortType,
    isReverseGoods,
  );

  const isSortedByLength = sortType !== SortType.byLength;
  const isSortedByName = sortType !== SortType.byName;
  const isSortingOrReversingActive = sortType || isReverseGoods;

  const hanldeButtonReset = () => {
    setIsReverseGoods(false);
    setSortType(SortType.noSort);
  };

  const handleSortTypeChange = (sortTypeValue: SortType) => {
    setSortType(sortTypeValue);
  };

  const hanldeButtonReverse = () => {
    setIsReverseGoods(!isReverseGoods);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classnames(
            'button',
            'is-info',
            { 'is-light': isSortedByName },
          )}
          onClick={() => handleSortTypeChange(SortType.byName)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classnames(
            'button',
            'is-success',
            { 'is-light': isSortedByLength },
          )}
          onClick={() => handleSortTypeChange(SortType.byLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classnames(
            'button',
            'is-warning',
            { 'is-light': !isReverseGoods },
          )}
          onClick={hanldeButtonReverse}
        >
          Reverse
        </button>
        {isSortingOrReversingActive && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={hanldeButtonReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
